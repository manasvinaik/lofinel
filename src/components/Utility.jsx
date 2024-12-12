import React, { useState, useEffect } from 'react';

const Utility = ({ isPlaying }) => {
  const [dotVisible, setDotVisible] = useState(false);

  useEffect(() => {
    if (isPlaying) {
      const intervalId = setInterval(() => {
        setDotVisible((prev) => !prev); 
      }, 500); 

      return () => clearInterval(intervalId);
    } else {
      setDotVisible(false); 
    }
  }, [isPlaying]);

  return (
    <div className="utility-container">
      <p className="utility-text">
        {isPlaying ? `listening ${dotVisible ? '⦿' : ''}` : '--'}
      </p>
    </div>
  );
};

export default Utility;
