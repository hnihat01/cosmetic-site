import React from 'react';
import newJson from '../Data/Animation5.json'; // Import another animation JSON file
import Lottie from 'react-lottie';
const NotFoundPage = () => {
  function generateLottieOptions(animationData) {
    return {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    };
  }
  return (
    <div style={{ textAlign: 'center', marginTop: '0px' }}>
    <Lottie
            options={generateLottieOptions(newJson)}
            height={600}
            width={800}
          />
      <p style={{fontFamily:'Vivaldi', color:'#5b463e', fontSize:'20px'}}>The page you are looking for does not exist.</p>
      <p style={{fontFamily:'Vivaldi', color:'#5b463e', fontSize:'18px'}}>Please return to the <a href="/" style={{ color:'#5b463e'}}>homepage</a>.</p>
    </div>
  );
};

export default NotFoundPage;
