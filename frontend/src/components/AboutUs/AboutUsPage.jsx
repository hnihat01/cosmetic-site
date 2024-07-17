import React, { useEffect } from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { useLocation } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import backhround from '../Data/background.png';

const AboutUsPage = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#contact') {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <Box sx={{ maxWidth: '800px', margin: 'auto', padding: '10%', backgroundColor: '#f9f9f9', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', }}>
      <Typography variant="h3" sx={{ textAlign: 'center', marginBottom: '20px', fontWeight: 'bold', color: '#745a50', fontFamily: 'Vivaldi' }}>
        About Agena
      </Typography>

      <Typography variant="body1" sx={{ marginBottom: '20px', lineHeight: '1.6', color: '#745a50', fontFamily: 'Vivaldi', textAlign: 'justify' }}>
        Agena Beauty is your one-stop destination for premium cosmetics and beauty products. We believe in the power of self-expression through makeup and skincare, and our mission is to empower individuals to embrace their unique beauty.
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: '20px', lineHeight: '1.6', color: '#745a50', fontFamily: 'Vivaldi', textAlign: 'justify' }}>
        Our product range includes a wide variety of cosmetics, skincare essentials, and beauty tools curated from the finest ingredients and materials. Whether you're looking for vibrant eyeshadow palettes, nourishing moisturizers, or professional makeup brushes, we've got you covered.
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: '20px', lineHeight: '1.6', color: '#745a50', fontFamily: 'Vivaldi', textAlign: 'justify' }}>
        At Agena Beauty, quality and customer satisfaction are our top priorities. We are committed to providing you with exceptional products that deliver outstanding results, along with excellent customer service to ensure your shopping experience is nothing short of delightful.
      </Typography>
      <Typography variant="body1" sx={{ lineHeight: '1.6', color: '#745a50', fontFamily: 'Vivaldi', textAlign: 'justify' }}>
        Explore our collection today and discover the beauty products that will elevate your makeup routine and skincare regimen to new heights.
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box sx={{ flex: 1 }}>
          <img src={backhround} style={{ maxWidth: '90%', height: '230px', marginTop: '20%' }} alt="Background" />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: '20px', fontWeight: 'bold', color: '#745a50', marginTop: '40px', fontFamily: 'Vivaldi' }}>
            Our Vision and Mission
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: '20px', lineHeight: '1.6', color: '#745a50', fontFamily: 'Vivaldi', textAlign: 'justify' }}>
            At Agena Beauty, our vision is to be a global leader in the beauty industry by setting new standards in quality, innovation, and customer satisfaction. We are passionate about helping individuals feel confident and beautiful in their own skin.
          </Typography>
          <Typography id='contact' variant="body1" sx={{ marginBottom: '20px', lineHeight: '1.6', color: '#745a50', fontFamily: 'Vivaldi', textAlign: 'justify' }}>
            Our mission is to provide high-quality, safe, and effective beauty products that enhance the natural beauty of our customers. We are committed to continuous innovation and excellence in everything we do.
          </Typography>
        </Box>
      </Box>

      <Box sx={{ marginTop: '40px', textAlign: 'center' }}>
        <Typography variant="h4" sx={{ marginBottom: '10px', fontWeight: 'bold', color: '#745a50', fontFamily: 'Vivaldi' }}>
          Contact Us
        </Typography>
        <Card sx={{ marginBottom: '10px', backgroundColor: '#ffffff' }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#745a50', fontFamily: 'Vivaldi' }}>
              <EmailIcon sx={{ verticalAlign: 'middle', marginRight: '8px' }} /> Customer Service
            </Typography>
            <Typography variant="body1" sx={{ color: '#745a50', fontFamily: 'Vivaldi' }}>
              <AlternateEmailIcon sx={{ verticalAlign: 'middle', marginRight: '3px' }} /> support@agenabeauty.com
            </Typography>
            <Typography variant="body1" sx={{ color: '#745a50', fontFamily: 'Vivaldi' }}>
              <PhoneIcon sx={{ verticalAlign: 'middle', marginRight: '8px' }} /> Phone: (123) 456-7890
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ marginBottom: '10px', backgroundColor: '#ffffff' }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#745a50', fontFamily: 'Vivaldi' }}>
              <LocationOnIcon sx={{ verticalAlign: 'middle', marginRight: '8px' }} /> Headquarters
            </Typography>
            <Typography variant="body1" sx={{ color: '#745a50', fontFamily: 'Vivaldi' }}>
              123 Beauty Ave, Suite 456
            </Typography>
            <Typography variant="body1" sx={{ color: '#745a50', fontFamily: 'Vivaldi' }}>
              Los Angeles, CA 90001
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ marginBottom: '10px', backgroundColor: '#ffffff' }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#745a50', fontFamily: 'Vivaldi' }}>
              Follow Us
            </Typography>
            <Typography variant="body1" sx={{ color: '#745a50', fontFamily: 'Vivaldi' }}>
              <InstagramIcon sx={{ verticalAlign: 'middle', marginRight: '8px' }} /> Instagram: @agenabeauty
            </Typography>
            <Typography variant="body1" sx={{ color: '#745a50', fontFamily: 'Vivaldi' }}>
              <FacebookIcon sx={{ verticalAlign: 'middle', marginRight: '8px' }} /> Facebook: @agenabeauty
            </Typography>
            <Typography variant="body1" sx={{ color: '#745a50', fontFamily: 'Vivaldi' }}>
              <TwitterIcon sx={{ verticalAlign: 'middle', marginRight: '8px' }} /> Twitter: @agenabeauty
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default AboutUsPage;
