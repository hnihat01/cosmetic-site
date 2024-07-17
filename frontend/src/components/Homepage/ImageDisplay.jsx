import React from 'react';

function ImageDisplay({ imageUrl }) {
  const containerStyle = {
    width: '100%',
    maxWidth: '90%',
    height: '270px', // Fixed height for the image container
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden', // Hide any overflow content
  };

  const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover', // Ensure the image covers the container
  };

  return (
    <div style={containerStyle}>
      <img
        src={imageUrl}
        loading="lazy"
        alt=""
        style={imageStyle}
      />
    </div>
  );
}

export default ImageDisplay;
