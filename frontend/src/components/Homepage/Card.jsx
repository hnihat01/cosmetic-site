import React, { Fragment } from 'react';
import VideoCard from './VideoCard';
import Title from './Title';

const Card = () => {
  return (
   <Fragment>
      <Title title="New Arrivals" />
    <VideoCard src="cream.mp4"/>
    <VideoCard src="lips.mp4"/>
   </Fragment>
  );
}

export default Card;
