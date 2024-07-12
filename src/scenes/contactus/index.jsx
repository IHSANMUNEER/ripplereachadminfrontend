import React, { useState } from 'react';
import { useForm } from '@formspree/react';
import { Box, TextField, Button, Typography, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { useTheme } from '@mui/material/styles';

const ContactForm = () => {
  const theme = useTheme();
  const [state, handleSubmit] = useForm('xwkzzzva');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
  };

  return (
    <Box sx={{
      mt: 4,
      mx: 'auto', 
      width: '100%', 
      //bgcolor: theme.palette.background.alt,
      p: 4,
      display: 'flex',
      flexDirection: 'column', 
      alignItems: 'center',
    }}>
      <Typography variant="h4" gutterBottom sx={{ color: theme.palette.text.primary, fontWeight: 'medium' }}>
       <strong> Contact Us</strong>
      </Typography>
      <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: 480 }}> 
        <TextField
          fullWidth
          label="Email"
          type="email"
          name="email"
          variant="outlined"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          sx={{ input: { borderRadius: 10 } }}
        />

        <TextField
          fullWidth
          label="Message"
          name="message"
          variant="outlined"
          margin="normal"
          multiline
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          sx={{ input: { borderRadius: 10 } }}
        />

        <Button type="submit" color="primary" variant="contained" fullWidth sx={{
          mt: 3,
          bgcolor: 'skyblue',
          '&:hover': {
            bgcolor: theme.palette.background.alt
          },
          borderRadius: 1,
          padding: '10px 20px',
          fontWeight: 'bold',
          fontSize: '12px',
          color : 'black'
        }} disabled={state.submitting}>
          Send
        </Button>
      </form>

      {state.succeeded && (
        <Snackbar open autoHideDuration={6000} onClose={handleClose}>
          <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Message sent successfully!
          </MuiAlert>
        </Snackbar>
      )}
    </Box>
  );
};

export default ContactForm;
