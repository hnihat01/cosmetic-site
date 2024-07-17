import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import Lottie from 'react-lottie';
import animation1 from '../Data/Animation1.json';
import animation2 from '../Data/Animation2.json';
import animation7 from '../Data/Animation7.json';
import animation4 from '../Data/Animation4.json';

const Textcontainer = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  const renderBox = (text, animation, animationHeight, animationWidth) => (
    <Grid item xs={12} sm={6} md={3} key={text}>
      <Paper
        elevation={3}
        sx={{
          padding: 2,
          backgroundColor: 'rgba(175, 135, 121, 0.05)',
          border: '3px solid rgba(175, 135, 121, 0.35)',
          borderRadius:'15px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          height: '70%',
        }}
      >
        <Lottie
          options={{
            ...defaultOptions,
            animationData: animation,
          }}
          height={animationHeight}
          width={animationWidth}
        />
        <Typography variant="subtitle1" sx={{fontFamily:'Vivaldy', color:'#745a50'}}>
          {text.includes('\n') ? (
            text.split('\n').map((line, index) => (
              <React.Fragment key={index}>
                {index === 0 ? <strong>{line}</strong> : line}
                <br />
              </React.Fragment>
            ))
          ) : (
            text
          )}
        </Typography>
      </Paper>
    </Grid>
  );

  return (
    <Grid container spacing={3} sx={{ margin: '0 auto', maxWidth: '1200px', marginBottom: '3%' }}>
      {[
        { text: 'Free Shipping\nover $80', animation: animation1, height: 100, width: 220 },
        { text: 'Free returns\nwithin 30 days', animation: animation2, height: 100, width: 90 },
        { text: 'Secure payment\nwith card', animation: animation7, height: 100, width: 150 },
        { text: 'Guaranteed quality\nat AGENA', animation: animation4, height: 100, width: 100 },
      ].map(({ text, animation, height, width }) => renderBox(text, animation, height, width))}
    </Grid>
  );
};

export default Textcontainer;
