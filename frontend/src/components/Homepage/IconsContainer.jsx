import React from 'react';
import { styled } from '@mui/system';
import { Box, Paper, Typography } from '@mui/material';


const Container = styled(Box)({
  width: '100%',
  padding: '10px',
  boxSizing: 'border-box',
  // backgroundColor:'#c29686',
  backgroundImage: `linear-gradient(to bottom, #f7edea, #c29686)`, // Gradient background
  marginTop:'0px',

});

const Item = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '20%', // Set width of each item (adjust as needed)
  marginBottom: '25px', // Set margin bottom for spacing between items
  textAlign: 'center', // Center-align text
});

const IconWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '50px',
  width: '50px',
  '& img': {
    width: '100%',
    height: 'auto',
    maxWidth: '100%',
    maxHeight: '100%',
  },
});

const DescriptionTypography = styled(Typography)({
  textAlign: 'center', // Center-align text
  marginLeft:'30px',
  fontFamily: 'Vivaldi'
});

const IconTextComponent = () => {
  return (
    <Container component={Paper} elevation={4}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Item>
          <IconWrapper>
            <img src='certificate.png' alt='Certificate' />
          </IconWrapper>
          <Typography variant="body1" sx={{ fontFamily: 'Vivaldi'}}>Certificate</Typography>
          <DescriptionTypography variant="caption">
            Certified vegan product with natural ingredients. Supports sustainable practices.
          </DescriptionTypography>
        </Item>
        <Item>
          <IconWrapper>
            <img src='recycle.png' alt='Recycle' />
          </IconWrapper>
          <Typography variant="body1">Recycle</Typography>
          <DescriptionTypography variant="caption">
          Our products are made with recyclable materials, packaging, containers, and components.          </DescriptionTypography>
        </Item>
        <Item>
          <IconWrapper>
            <img src='donation.png' alt='Donation' />
          </IconWrapper>
          <Typography variant="body1" sx={{ fontFamily: 'Vivaldi'}}>Donation</Typography>
          <DescriptionTypography variant="caption">
            Portions of proceeds donated to charitable causes supporting community welfare.
          </DescriptionTypography>
        </Item>
        <Item>
          <IconWrapper>
            <img src='healthy-living.png' alt='Healthy Living' />
          </IconWrapper>
          <Typography variant="body1" sx={{ fontFamily: 'Vivaldi'}}>Healthy Living</Typography>
          <DescriptionTypography variant="caption">
            Encourages holistic wellness through clean beauty practices and lifestyle choices.
          </DescriptionTypography>
        </Item>
      </Box>
    </Container>
  );
};

export default IconTextComponent;
