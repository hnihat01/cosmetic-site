import React from 'react';
import { Menu, MenuItem, Typography, Button } from '@mui/material';

const NavigationMenu = ({ pages, anchorEl, handleClose }) => {
  return (
    <Menu
      id="menu-appbar"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={Boolean(anchorEl)}
      onClose={handleClose}
      
    >
      {pages.map((page, index) => (
        <MenuItem key={index} onClick={handleClose} sx={{backgroundColor:'#f7edea'}} >
          <Button
            component="a"
            href={page.link}
            style={{ textDecoration: 'none',
             color: '#745a50',
             minWidth: 'auto', 
            padding: '5px 10px',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.1)', // Background color on hover
              borderRadius: '4px', // Optional: Add border radius on hover
            },
          }}
            onClick={handleClose}
           
          >
            <Typography sx={{ fontFamily: 'Vivaldi italic' }} textAlign="center">
              {page.title}
            </Typography>
          </Button>
        </MenuItem>
      ))}
    </Menu>
  );
};

export default NavigationMenu;
