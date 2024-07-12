import React from 'react';
import { Box, Button, Container, Typography, Grid, useMediaQuery, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import notFoundImage from '../../assets/404.png'; // Ensure the path is correct

const Error = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                textAlign: isMobile ? 'center' : 'inherit' // Center text only on mobile
            }}
        >
            <Container maxWidth="md">
                <Grid container spacing={2} justifyContent="center">
                   
                    <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <img
                            src={notFoundImage}
                            alt="404 Not Found"
                            style={{
                                width: isMobile ? '60%' : '100%', // Reduce width by 40% on mobile
                                height: isMobile ? 150 : 250, // Also reduce height proportionally
                                maxWidth: isMobile ? 300 : 500, // Optional: Restrict the max width on mobile
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        
                        <Typography variant="h6" sx={{ mb: 2 , fontWeight: 'bold' }}>
                            The page you’re looking for doesn’t exist.
                        </Typography>
                        <Button variant="contained" onClick={() => navigate('/dashboard')} sx={{ width: isMobile ? '50%' : 'auto' , backgroundColor: 'skyblue' , fontWeight: 'bold'}}>
                            Back Home
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default Error;
