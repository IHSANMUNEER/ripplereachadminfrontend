import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setMode } from 'state';
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Typography,
  IconButton,
  InputBase,
  useTheme,
  Hidden,
} from '@mui/material';
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import logoImage from 'assets/logo.png'; // Ensure this path is correct
import { useNavigate } from 'react-router-dom';

const Navbar = ({ user, isSidebarOpen, setIsSidebarOpen }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  useEffect(() => {
    setIsSidebarOpen(false);
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = () => {
    navigate(`/search?q=${searchQuery}`);
    setShowMobileSearch(false);
  };

  const toggleMobileSearch = () => {
    setShowMobileSearch(!showMobileSearch);
  };

  const handleLogout = () => {
    // Perform logout actions here, such as clearing local storage, state, etc.
    navigate('/login'); // Navigate to the login route
  };

  return (
    <AppBar sx={{ position: 'static', background: 'none', boxShadow: 'none' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Hidden smUp>
          <IconButton
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            title="Toggle Sidebar"
            sx={{ mr: 1 }}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>

        <Hidden smUp>
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
            <img
              src={logoImage}
              alt="Ripple Reach Logo"
              style={{ height: 32, width: 32 }}
            />
          </Box>
        </Hidden>

        <Hidden smDown>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img
              src={logoImage}
              alt="Ripple Reach Logo"
              style={{
                height: 32,
                width: 32,
                marginRight: theme.spacing(1),
              }}
            />
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ fontWeight: 'bold' }}
              onClick={() => navigate('/adminblogaction')}
            >
              Ripple Reach
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
            <Button onClick={() => navigate('/admin11209@')} color="inherit">
              Add Blog
            </Button>
            <Button onClick={() => navigate('/adminblogaction')} color="inherit">
              Blogs
            </Button>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box
              sx={{
                display: 'flex',
                backgroundColor: theme.palette.background.alt,
                borderRadius: '9px',
                gap: '1rem',
                padding: '0.1rem 1.5rem',
                alignItems: 'left',
              }}
            >
              <InputBase
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <IconButton onClick={handleSearchSubmit}>
                <SearchIcon />
              </IconButton>
            </Box>
            <IconButton
              onClick={() => dispatch(setMode())}
              title="Toggle Dark/Light Mode"
              sx={{ ml: 1 }}
            >
              {theme.palette.mode === 'dark' ? (
                <DarkModeOutlined />
              ) : (
                <LightModeOutlined />
              )}
            </IconButton>
          </Box>
        </Hidden>

        <Hidden smUp>
          {showMobileSearch ? (
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                backgroundColor: theme.palette.background.alt,
                borderRadius: '10px',
                padding: '0.1rem 1.5rem',
              }}
            >
              <InputBase
                placeholder="Search..."
                fullWidth
                value={searchQuery}
                onChange={handleSearchChange}
                autoFocus
              />
              <IconButton onClick={handleSearchSubmit}>
                <SearchIcon />
              </IconButton>
            </Box>
          ) : (
            <IconButton onClick={toggleMobileSearch} title="Search">
              <SearchIcon />
            </IconButton>
          )}
          <IconButton
            onClick={() => dispatch(setMode())}
            title="Toggle Dark/Light Mode"
            sx={{ ml: 1 }}
          >
            {theme.palette.mode === 'dark' ? (
              <DarkModeOutlined />
            ) : (
              <LightModeOutlined />
            )}
          </IconButton>
        </Hidden>

        {/* Logout Button */}
        <Button onClick={handleLogout} color="inherit">
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
