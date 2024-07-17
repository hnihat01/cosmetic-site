import * as React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Title from './Title';

export default function ImageAvatars() {
  return (
    <React.Fragment>
      <Title
        title="SHOP BY CATEGORIES"
        fontSize="14px" // Custom font size
        color="#977568" // Custom color
        marginTop="3%" // Set marginTop to 0 to remove space
      />
      <Title title="Popular Categories" marginTop="-10px" />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Stack direction="row" spacing={5}>
          <CategoryLink to="/category/Care" src="care.jpeg" label="Care" />
          <CategoryLink to="/category/Makeup" src="makeup.jpeg" label="Makeup" />
          <CategoryLink to="/category/Hair" src="hairs.jpeg" label="Hair" />
          <CategoryLink to="/category/Parfum" src="parfum.jpeg" label="Parfum" />
          <CategoryLink to="/category/Hands" src="nails.jpeg" label="Hands" />
          <CategoryLink to="/category/Sale" src="sale.jpeg" label="Sale" />
        </Stack>
      </div>
    </React.Fragment>
  );
}

function CategoryLink({ to, src, label }) {
  return (
    <Link to={to} style={{ textDecoration: 'none', color: 'inherit' }}>
      <CategoryAvatar src={src} label={label} />
    </Link>
  );
}

function CategoryAvatar({ src, label }) {
  return (
    <Stack direction="column" alignItems="center">
      <Avatar
        alt={label}
        src={src}
        sx={{
          width: '100px',
          height: '100px',
          '@media (max-width:600px)': {
            width: '50px',
            height: '50px',
          },
        }}
      />
      <Typography variant="body1" align="center" sx={{ fontFamily: 'Vivaldi italic' }}>
        {label}
      </Typography>
    </Stack>
  );
}
