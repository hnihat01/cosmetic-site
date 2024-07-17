import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Lottie from 'react-lottie';
import animationData from '../Data/lottie.json'; 


const pages = ['Products', 'Favourite','Cart', 'Order','About us'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

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
    animationData: animationData, // Use imported animation data
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
//<AppBar position="static" sx={{ backgroundColor: 'rgba(51, 51, 51, 0.1)' }}>
/* <Box sx={{
  backgroundImage: `url('background.png')`,
  backgroundSize:'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  height: '70vh',

  
}}> */


  return (
      <Box
  sx={{
    position: 'fixed', width: '100%', zIndex: 1000, height: '15vh',
    overflow: 'hidden', // Ensure the video doesn't overflow
  }}
>

<AppBar position="static" sx={{ backgroundColor: 'rgba(255, 255, 255, .3)', backdropFilter: 'blur(5px)'  }}>
  
      <Container maxWidth="xl">     
        <Toolbar disableGutters>
          <Lottie
        options={defaultOptions}
        height={50}
        width={50}
      />
         
          <Box sx={{ fontFamily: 'Vivaldi italic',flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
           
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
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{fontFamily: 'Vivaldi italic',
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography sx={{fontFamily: 'Vivaldi italic'}} textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
              
            </Menu>
     
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

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }}}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ fontFamily: 'Vivaldi italic',my: 2, color: 'black', display: 'block' }}
              >
                {page}
              </Button>
            ))}
            <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              ml:2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'Vivaldi Italic',
              fontWeight: 500,
              fontSize:'26px',
              letterSpacing: '.3rem',
              color: 'black',
              textDecoration: 'none',
              marginTop:'15px',
              marginLeft:'25%'
            }}
          >
           AGENA
          </Typography>
     
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0,color:'red'}}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ fontFamily: 'Vivaldi italic',mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }} 
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>

  </Box>
  );
}
export default Navbar;


