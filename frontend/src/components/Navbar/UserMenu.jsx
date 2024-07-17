import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

const UserMenu = ({ settings, anchorEl, handleClose }) => {
  return (
    <Menu
      id="menu-appbar"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
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
      {settings.map((setting) => (
        <MenuItem key={setting} onClick={handleClose}>
          <Typography textAlign="center">{setting}</Typography>
        </MenuItem>
      ))}
    </Menu>
  );
};

export default UserMenu;
