import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Typography, Container, Paper, useTheme, Modal, IconButton, Backdrop } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Footer from 'scenes/footer';
const BlogDetails = () => {
  const { state } = useLocation();
  const blogData = state.blog;
  const theme = useTheme();
  const [open, setOpen] = useState(false); // For modal visibility
  const [selectedImage, setSelectedImage] = useState(''); // To hold the image URL

  const handleOpen = (imgUrl) => {
    setSelectedImage(imgUrl);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
    <Container>
      <Paper elevation={4} sx={{ padding: theme.spacing(4) }}>
        <Typography
          variant="h6"  
          color="text.secondary"
          sx={{
            alignSelf: 'center',mb: 3}}
        >
          {new Date(blogData.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })} | {blogData.readTime}
        </Typography>


        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', marginBottom: theme.spacing(2) }}>
          {blogData.title}
        </Typography>
        <Typography variant="subtitle1" paragraph sx={{ marginBottom: theme.spacing(4) }}>
          {blogData.overview}
        </Typography>

        {blogData.sections.map((section, index) => (
          <Box key={index} sx={{ marginBottom: theme.spacing(5) }}>
            <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', marginBottom: theme.spacing(2) }}>
              {section.heading}
            </Typography>
            <Typography paragraph sx={{ lineHeight: '1.4' }}>{section.content}</Typography>
            {section.imageUrl && (
              <Box
                component="img"
                sx={{
                  width: '90%',
                  maxHeight: '90%',
                  borderRadius: '5px',
                  marginTop: theme.spacing(2),
                  display: 'block',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  cursor: 'pointer'
                }}
                alt="Detailed aspect of the section"
                src={section.imageUrl}
                onClick={() => handleOpen(section.imageUrl)}
              />
            )}
          </Box>
        ))}

        {/* Modal for image preview */}
        <Modal
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Box sx={{ outline: 'none', position: 'relative', width: '100%', height: '100%' }}>
            <IconButton
              onClick={handleClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: 'yellow',
                zIndex: 1400,

                fontSize: '2rem',
                '& svg': {
                  fontSize: '2rem',
                  fontWeight: 'bold'
                }
              }}
            >
              <CloseIcon />
            </IconButton>
            <img src={selectedImage} alt="Enlarged" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </Box>
        </Modal>
      </Paper>
    </Container>
    <Footer/>
    </>
  );
};

export default BlogDetails;
