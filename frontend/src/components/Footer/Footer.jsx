import React from 'react';
import { Container, Typography, Link, Grid } from '@mui/material';
import { styled } from '@mui/system';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import PinterestIcon from '@mui/icons-material/Pinterest';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Lottie from 'react-lottie';
import animationData from '../Data/lottie.json';

const FooterContainer = styled('footer')(({ theme }) => ({
  backgroundColor: '#f4cbbd', // Fallback background color
  backgroundImage: `linear-gradient(to bottom, #f7edea, #af8779)`, // Gradient background
  color: '#fff',
  padding: theme.spacing(2, 0),
}));

const CustomLink = styled(Link)({
  fontFamily: 'Vivaldi italic',
  color: '#745a50',
  textDecoration: 'none', // Remove underline
  '&:hover': {
    textDecoration: 'none', // Remove underline on hover as well
    color: '#977568',
  },
});

const FooterSection = styled('div')({
  marginBottom: '40px',
  textDecoration: 'none',
});

const SectionTitle = styled(Typography)({
  fontFamily: 'Vivaldi italic',
  fontWeight: 'bold',
  marginBottom: '20px',
  color: '#745a50',
});

const SocialIconLink = styled(Link)({
  marginRight: '45px',
  fontSize: '32px',
  color: '#745a50',
  '&:hover': {
    color: '#977568',
  },
});



const Footer = () => {
  const currentYear = new Date().getFullYear();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <FooterContainer>
    <Container maxWidth="lg">
      <Grid container spacing={2} alignItems="center"> {/* Center align the items */}
        {/* Quick Links section */}
        <Grid item xs={12} sm={4} md={3}>
        <FooterSection>
  <SectionTitle variant="h5">Quick Links</SectionTitle>
  <div style={{ display: 'flex', justifyContent: 'flex-start',gap:'10px' }}> {/* Align items to the start */}
    <Typography>
      <CustomLink href="/about" color="inherit">
        About Us
      </CustomLink>
    </Typography>
    <Typography>
      <CustomLink href="/about#contact" color="inherit">
        Contact Us
      </CustomLink>
    </Typography>
  </div>
</FooterSection>

        </Grid>
  
        {/* Center align copyright text with Lottie animation */}
        <Grid item xs={12} sm={4} md={6} style={{ textAlign: 'center' }}> {/* Increase the size of the grid item for the center content */}
          <Typography variant="body1" sx={{ size: '500', fontFamily: 'Vivaldi italic', fontWeight: 'bold', color: '#745a50', fontSize: '18px' }}>
            <Lottie options={defaultOptions} height={70} width={70} />
            &copy; {currentYear} Agena Beauty. All rights reserved.
          </Typography>
        </Grid>
  
        {/* Follow Us section */}
        <Grid item xs={12} md={3} style={{ textAlign:'right'  }}> {/* Align the Follow Us section to the right */}
          <FooterSection>
            <SectionTitle variant="h5">Follow Us</SectionTitle>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginLeft:'55vh' }}> {/* Justify content to flex-end */}
              <SocialIconLink href="https://facebook.com/agenabeauty" target="_blank" rel="noopener noreferrer">
                <FacebookIcon />
              </SocialIconLink>
              <SocialIconLink href="https://instagram.com/agenabeauty" target="_blank" rel="noopener noreferrer">
                <InstagramIcon />
              </SocialIconLink>
              <SocialIconLink href="https://twitter.com/agenabeauty" target="_blank" rel="noopener noreferrer">
                <TwitterIcon />
              </SocialIconLink>
              <SocialIconLink href="https://pinterest.com/agenabeauty" target="_blank" rel="noopener noreferrer">
                <PinterestIcon />
              </SocialIconLink>
              <SocialIconLink href="https://youtube.com/agenabeauty" target="_blank" rel="noopener noreferrer">
                <YouTubeIcon />
              </SocialIconLink>
            </div>
          </FooterSection>
        </Grid>
      </Grid>
    </Container>
  </FooterContainer>
  
  );
};

export default Footer;
