import React, { useEffect } from 'react';

const CustomLoader = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish(); 
    }, 1000); 

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="custom-loader">
      <div
        className="expanding-rectangle"
        style={{
          backgroundImage: "url('/assets/background/gif7.gif')", 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>
    </div>
  );
};
export default CustomLoader;