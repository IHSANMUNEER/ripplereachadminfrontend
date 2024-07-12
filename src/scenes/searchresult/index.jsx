import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Box, Typography, Card, CardContent, CardMedia, CardActions, Button, IconButton, Snackbar, useTheme, useMediaQuery } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import { useNavigate } from 'react-router-dom';
import Footer from 'scenes/footer';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function SearchResults() {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const query = useQuery();
  const searchQuery = query.get('q');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://api-production-1cdf.up.railway.app/posease/search?query=${searchQuery}`);
        setResults(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch results');
        setLoading(false);
      }
    };

    fetchResults();
  }, [searchQuery]);

  const handleReadMoreClick = (result) => {
    navigate('/read', { state: { blog: result } });
  };

  const handleShareClick = async (result) => {
    try {
      await navigator.clipboard.writeText(`http://example.com/blogs/${result._id}`);
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

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <>
    <Box sx={{ marginTop: 2, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
      <Typography variant="h4" sx={{ marginBottom: 2, textAlign: 'center', width: '100%' }}>
        Search Results for "{searchQuery}"
      </Typography>
      {results.length > 0 ? (
        results.map((item, index) => (
          <Card key={index} sx={{
            maxWidth: isMobile ? '100%' : '297px',
            width: '100%', // Ensures full width on mobile
            margin: theme.spacing(0.5),
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
            <CardMedia
              component="img"
              sx={{ height: 150 }}
              image={item.sections[0]?.imageUrl || 'https://via.placeholder.com/400x250?text=No+Image'}
              alt={item.title}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {item.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.overview}
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'space-between', padding: theme.spacing(1) }}>
              <IconButton aria-label="share" sx={{ color: '#87CEEB' }} onClick={() => handleShareClick(item)}>
                <ShareIcon />
              </IconButton>
              <Button size="small" sx={{ color: '#87CEEB' }} onClick={() => handleReadMoreClick(item)}>Read More</Button>
            </CardActions>
          </Card>
        ))
      ) : (
        <Typography>No results found.</Typography>
      )}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
    </Box>
    <Footer/>
    </>
  );
}

export default SearchResults;
