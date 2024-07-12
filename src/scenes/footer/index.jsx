import * as React from 'react';
import { Box, Container, Link, Typography, IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

function Footer() {
  return (
    <Box component="footer" sx={{ width: '100%', mt: 5, py: 2.5, px: { xs: 2, sm: 4 } }}>
      <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>

        {/* Contact Information Section */}
        <Typography variant="h6" gutterBottom>Contact Us</Typography>

        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', mt: 2, mb: 2 }}>
          <Link href="mailto:ihsanmuneer288@gmail.com" sx={{ display: 'flex', alignItems: 'center', color: 'text.primary', textDecoration: 'none', mr: 4 }}>
            <EmailIcon sx={{ mr: 1 }} />
            ihsanmuneer288@gmail.com
          </Link>
          <Link href="tel:+92166232147" sx={{ display: 'flex', alignItems: 'center', color: 'text.primary', textDecoration: 'none' }}>
            <PhoneIcon sx={{ mr: 1 }} />
            (+92) 3166232147
          </Link>
        </Box>

        {/* Social Media Links */}
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
          <IconButton href="https://github.com" color="inherit">
            <GitHubIcon />
          </IconButton>
          <IconButton href="https://twitter.com" color="inherit">
            <TwitterIcon />
          </IconButton>
          <IconButton href="https://linkedin.com" color="inherit">
            <LinkedInIcon />
          </IconButton>
        </Box>

        {/* Copyright Text */}
        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 3 }}>
          © 2024-25 RippleReach
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
