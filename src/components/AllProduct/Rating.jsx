import React from 'react';
import Star from './Star';

const Rating = ({ rating }) => {
  const totalStars = 5; // Total number of stars
  const stars = [];

  for (let i = 1; i <= totalStars; i++) {
    stars.push(<Star key={i} filled={i <= rating} />);
  }

  return <div>{stars}</div>;
};

export default Rating;