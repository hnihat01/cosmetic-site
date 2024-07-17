
import React from 'react';


const VideoComponent = () => {
  return (
    <div style={{ position: 'relative', height: '80vh' }}>

  <video
autoPlay
loop
muted
style={{
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover', // Cover the entire area while maintaining aspect ratio
  zIndex: -1, // Put the video behind other content
}}
>
<source src="backvideo.mp4" type="video/mp4" />

</video>
</div>
  );
}

export default  VideoComponent;





