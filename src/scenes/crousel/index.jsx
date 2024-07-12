import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTheme, useMediaQuery, Box, Typography, Button, MobileStepper, Skeleton } from '@mui/material';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { useNavigate } from 'react-router-dom';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

function TrendingPosts() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [activeStep, setActiveStep] = useState(0);
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://192.168.187.115:5001/posease/getblog');
        const sortedBlogs = response.data
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 5);
        setBlogs(sortedBlogs);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch blogs:', error);
      }
    };
    fetchBlogs();
  }, []);

  const handleNext = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);
  const handleStepChange = (step) => setActiveStep(step);

  const navigateToBlogDetail = (blog) => {
    navigate('/read', { state: { blog } });
  };

  return (
    <Box sx={{
      maxWidth: 1216,
      flexGrow: 1,
      margin: 'auto',
      mt: 5,
      [theme.breakpoints.down('sm')]: { mx: 2 }
    }}>
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {isLoading ? (
          Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} variant="rectangular" height={isMobile ? 210 : 350} sx={{ width: '100%', borderRadius: 2 }} />
          ))
        ) : (
          blogs.map((blog, index) => (
            <Box key={index} onClick={() => navigateToBlogDetail(blog)} sx={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}>
              <img
                src={blog.sections[0]?.imageUrl || 'https://via.placeholder.com/400x250?text=No+Image'}
                alt={blog.title}
                style={{ height: isMobile ? 210 : 350, width: '100%', objectFit: 'cover', borderRadius: '2px' }}
              />
              <Typography
                sx={{
                  position: 'absolute',
                  left: 15,
                  bottom: 45,
                  color: 'white',
                  fontWeight: '900',
                  textShadow: '1px 1px 8px rgba(0, 0, 0, 0.6)',
                  padding: '8px',
                  textAlign: 'left',
                  fontSize: 20
                }}
              >
                {blog.title}
              </Typography>
            </Box>
          ))
        )}
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={isLoading ? 5 : blogs.length}
        position="static"
        activeStep={activeStep}
        sx={{ width: '100%' }}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={activeStep === (isLoading ? 4 : blogs.length - 1)}>
            Next
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            Back
          </Button>
        }
      />
    </Box>
  );
}

export default TrendingPosts;
