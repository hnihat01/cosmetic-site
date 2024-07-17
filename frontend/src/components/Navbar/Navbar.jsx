import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuIcon from '@mui/icons-material/Menu';
import Lottie from 'react-lottie';
import animationData from '../Data/lottie.json';
import NavigationMenu from './NavigationMenu';
import UserMenu from './UserMenu';
import HomeIcon from '@mui/icons-material/Home';
import StoreIcon from '@mui/icons-material/Store';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ReceiptIcon from '@mui/icons-material/Receipt';
import InfoIcon from '@mui/icons-material/Info';
const pages = [
  { title: <><HomeIcon /> Home</>, link: '/' },
  { title: <><StoreIcon /> Products</>, link: '/products' },
  { title: <><FavoriteIcon /> Favourites</>, link: '/favourite' },
  { title: <><ShoppingCartIcon /> Cart</>, link: '/cart' },
  { title: <><ReceiptIcon /> Orders</>, link: '/orders' },
  { title: <><InfoIcon /> About Us</>, link: '/about' },
];

const page= [
  { title: 'Home', link: '/' },
  { title: 'Products', link: '/products' },
  { title: 'Favourites', link: '/favourite' },
  { title: 'Cart', link: '/cart' },
  { title: 'Orders', link: '/orders' },
  { title: 'About Us', link: '/about' },
];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const location = useLocation();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <Box sx={{ position: 'fixed', width: '100%', zIndex: 1000, height: '15vh', overflow: 'hidden' }}>
      <AppBar position="static" sx={{ backgroundColor: 'rgba(255, 255, 255, .3)', backdropFilter: 'blur(5px)' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Lottie options={defaultOptions} height={50} width={50} />
          
            <Box sx={{ fontFamily: 'Vivaldi italic', flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="black"
              >
                <MenuIcon />
              </IconButton>
              
              <NavigationMenu pages={pages} anchorEl={anchorElNav} handleClose={handleCloseNavMenu} />
            </Box>

            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'Vivaldi italic',
                fontWeight: 500,
                letterSpacing: '.3rem',
                color: 'black',
                textDecoration: 'none',
              }}
            >
              AGENA
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {page.map((page) => (
                <Button
                  key={page.title}
                  component="a"
                  href={page.link}
                  onClick={handleCloseNavMenu}
                  sx={{
                    fontFamily: 'Vivaldi italic',
                    my: 2,
                    color: location.pathname === page.link ? 'black' : '#573b35',
                  

                  }}
                >
                  {page.title}
                </Button>
              ))}

              <Typography
                variant="h6"
                noWrap
                component="a"
                sx={{
                  mr: 2,
                  ml: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'Vivaldi Italic',
                  fontWeight: 500,
                  fontSize: '26px',
                  letterSpacing: '.3rem',
                  color: 'black',
                  textDecoration: 'none',
                  marginTop: '15px',
                  marginLeft: '13%',
                }}
              >
                AGENA
              </Typography>
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, color: 'red' }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <UserMenu settings={settings} anchorEl={anchorElUser} handleClose={handleCloseUserMenu} />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}

export default Navbar;
