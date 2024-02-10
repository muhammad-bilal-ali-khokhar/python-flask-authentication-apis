import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate, useParams } from 'react-router-dom';

export const Home = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const handleProfileView =()=>{
        navigate(`/profile/${id}`);
    }
  return (
    <AppBar position="static" style={{background:'#e50914'}}>
      <Toolbar>
        <div style={{ flexGrow: 1 }}>
          <h2>Home</h2> 
        </div>
        <IconButton color="inherit" edge="end">
          <span onClick={handleProfileView}><AccountCircleIcon />
          </span> 
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
