import React from 'react';

const Star = ({ filled }) => {
  return (
    <span style={{ color: filled ? 'gold' : 'gray' }}>
      ★
    </span>
  );
};

export default Star;
