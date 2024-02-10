import React from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export const Header = () => {
  return (
    <AppBar position="static"  style={{ backgroundColor: '#e50914', padding: '10px', textAlign: 'center', position: 'fixed', bottom: 0, width: '100%', zIndex: 9999 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          My App
        </Typography>
        <IconButton color="inherit">
          <AccountCircleIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
