import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Divider, Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText, useTheme, useMediaQuery, Hidden} from '@mui/material';
import { Add as AddIcon, MenuBook as MenuBookIcon, ChevronLeft as ChevronLeftIcon } from '@mui/icons-material';

function Sidebar({ drawerWidth, isSidebarOpen, setIsSidebarOpen }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  

  

  const navItems = [
    { text: "Add Blog", icon: <AddIcon />, path: "/admin11209@" },  
    { text: "Blogs", icon: <MenuBookIcon />, path: "/adminblogaction" },   
  ];

  const handleItemClick = (path) => {
    navigate(path);
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <Hidden smUp>
      <Drawer
        variant={isMobile ? 'temporary' : 'persistent'}
        open={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            ...(isMobile && { zIndex: theme.zIndex.drawer + 1 }),
          },
        }}
      >
        <IconButton
          onClick={() => setIsSidebarOpen(false)}
          sx={{ alignSelf: 'flex-end', m: 1 }}
        >
          <ChevronLeftIcon />
        </IconButton>

        <Divider />

        <List>
          {navItems.map((item) => (
            <ListItemButton
              key={item.text}
              onClick={() => handleItemClick(item.path)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </Hidden>
  );
}

export default Sidebar;
