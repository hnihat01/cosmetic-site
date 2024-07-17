import React, { Fragment, useRef, useEffect, useState } from 'react';
//import { Box } from '@mui/material';

const VideoCard = ({ src }) => {
  const videoRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1, // Adjust this value based on how much of the video needs to be in view to trigger animation
    };

    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, options);

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      observer.disconnect(); // Disconnect the observer in the cleanup function
    };
  }, []);

  useEffect(() => {
    if (isVisible && !hasAnimated) {
      // Start the animation
      const currentVideoRef = videoRef.current;
      if (currentVideoRef) {
        currentVideoRef.play();
        setHasAnimated(true);
      }
    } else if (!isVisible && hasAnimated) {
      // Reset hasAnimated when the video is not visible
      setHasAnimated(false);
    }
  }, [isVisible, hasAnimated]);

  const handleVideoEnded = () => {
    // This function is called when the video ends
    // You can add your animation logic here
   // console.log('Video ended');
  };

  return (
    <Fragment>
      <video
        ref={videoRef}
        autoPlay
        loop={false} // Disable looping so the video ends after playing once
        muted
        onEnded={handleVideoEnded}
        style={{
          marginLeft: '10%',
          marginTop: '1%',
          width: '35%', // Adjust the width of the video according to your layout
          height: 'auto',
          objectFit: 'cover', // Cover the entire area while maintaining aspect ratio
          visibility: isVisible ? 'visible' : 'hidden', // Hide the video when not in view
        }}
      >
        <source src={src} type="video/mp4" />
      </video>
    </Fragment>
  );
};

export default VideoCard;


