import React, { useState, useEffect } from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, IconButton, Chip, Stack, Snackbar, useTheme, useMediaQuery, Pagination, Skeleton } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Blogs = ({ heading = "Recent Posts" }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [blogs, setBlogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [blogsPerPage] = useState(12);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get('https://api-production-1cdf.up.railway.app/posease/getblog');
                setBlogs(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch blogs:', error);
            }
        };
        fetchBlogs();
    }, []);

    const handleReadMoreClick = (blog) => {
        navigate('/read', { state: { blog } });
    };

    const handleShareClick = async (blog) => {
        const url = `http://example.com/blogs/${blog._id}`;
        try {
            await navigator.clipboard.writeText(url);
            setSnackbarMessage('URL Copied to Clipboard!');
            setSnackbarOpen(true);
        } catch (err) {
            setSnackbarMessage('Failed to Copy URL');
            setSnackbarOpen(true);
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

    const handleChangePage = (event, newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <>
            <Typography
                variant="subtitle1"
                paragraph
                sx={{
                    marginBottom: theme.spacing(2),
                    marginTop: theme.spacing(4),
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: '1.25rem'
                }}
            >
                {heading}
            </Typography>
            <div style={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                flexWrap: 'wrap',
                margin: isMobile ? '10px' : '20px',
                marginLeft: isMobile ? '10px' : '150px',
                marginRight: isMobile ? '15px' : '150',
            }}>
                {isLoading ? (
                    Array.from({ length: 6 }).map((_, index) => (
                        <Card key={index} sx={{
                            maxWidth: isMobile ? 'auto' : '297px',
                            width: isMobile ? '100%' : '30%',
                            margin: theme.spacing(0.5),
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                        }}>
                            <Skeleton variant="rectangular" height={150} animation="wave" />
                            <CardContent>
                                <Skeleton width="60%" height={20} style={{ marginBottom: 6 }} />
                                <Skeleton width="80%" height={20} style={{ marginBottom: 6 }} />
                                <Skeleton width="40%" height={20} />
                            </CardContent>
                            <CardActions>
                                <Skeleton width="10%" height={20} style={{ marginLeft: 8 }} />
                                <Skeleton width="20%" height={20} style={{ marginLeft: 'auto', marginRight: 8 }} />
                            </CardActions>
                        </Card>
                    ))
                ) : (
                    currentBlogs.map((card, index) => (
                        <Card key={card._id.$oid} sx={{
                            maxWidth: isMobile ? 'auto' : '297px',
                            width: isMobile ? '100%' : '30%',
                            margin: theme.spacing(0.5),
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                        }}>
                            <CardMedia
                                component="img"
                                sx={{ height: 150 }}
                                image={card.sections[0].imageUrl}
                                title={card.title}
                            />
                            <CardContent>
                                <Chip label={card.chip.label} color={card.chip.color} variant="outlined" sx={{ marginBottom: 1, height: 20 }} />
                                <Typography gutterBottom variant="h5" component="div">
                                    {card.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {card.overview}
                                </Typography>
                            </CardContent>
                            <CardActions sx={{ justifyContent: 'space-between', padding: theme.spacing(1) }}>
                                <IconButton aria-label="share" sx={{ color: '#87CEEB' }} onClick={() => handleShareClick(card)}>
                                    <ShareIcon />
                                </IconButton>
                                <Typography variant="caption" color="text.secondary" sx={{ alignSelf: 'center' }}>
                                    {new Date(card.date).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })} | {card.readTime}
                                </Typography>

                                <Button size="small" sx={{ color: '#87CEEB' }} onClick={() => handleReadMoreClick(card)}>Read More</Button>
                            </CardActions>
                        </Card>
                    ))
                )}
            </div>
            <Stack justifyContent="center" alignItems="center" marginBottom={5}>
                <Pagination count={Math.ceil(blogs.length / blogsPerPage)} page={currentPage} onChange={handleChangePage} />
            </Stack>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message={snackbarMessage}
            />
        </>
    );
};

export default Blogs;
