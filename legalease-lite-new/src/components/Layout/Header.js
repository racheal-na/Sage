import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Avatar,
  Box
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  AccountCircle as AccountIcon
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

function Header({ title, onNotificationsClick }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const { user, logout } = useAuth();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
  };

  return (
    <AppBar position="static" elevation={2}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
        
        <IconButton color="inherit" onClick={onNotificationsClick}>
          <Badge badgeContent={4} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        
        <IconButton color="inherit" onClick={handleMenu}>
          <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}>
            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
          </Avatar>
        </IconButton>
        
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>Settings</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default Header;