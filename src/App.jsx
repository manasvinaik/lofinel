import React, { useState, useEffect, useCallback } from 'react';
import About from './components/About'; 
import Player from './components/Player';
import CustomLoader from './components/CustomLoader'; 
import './App.css';

const App = () => {
  const gifs = [
    '/assets/background/gif1.gif',
    '/assets/background/gif2.gif',
    '/assets/background/gif3.gif',
    '/assets/background/gif4.gif',
    '/assets/background/gif5.gif',
    '/assets/background/gif6.gif',
    '/assets/background/gif7.gif',
    '/assets/background/gif8.gif',
    '/assets/background/gif9.gif',
    '/assets/background/gif10.gif',
    '/assets/background/gif11.gif',
    '/assets/background/gif12.gif',
    '/assets/background/gif13.gif',
    '/assets/background/gif14.gif',
    '/assets/background/gif15.gif',
    '/assets/background/gif16.gif',
    '/assets/background/gif17.gif',
    '/assets/background/gif18.gif',
    '/assets/background/gif19.gif',
    '/assets/background/gif20.gif',
    '/assets/background/gif21.gif',
    '/assets/background/gif22.gif',
    '/assets/background/gif23.gif',
  ];

  const vhsGifs = [
    '/assets/vhsgif1.gif',
    '/assets/vhsgif2.gif',
    '/assets/vhsgif3.gif',
    '/assets/vhsgif4.gif',
  ];

  const vhsSound = '/assets/vhssound.wav';

  const [currentGif, setCurrentGif] = useState(gifs[6]);
  const [showVhsGif, setShowVhsGif] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const changeGifWithVhsEffect = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * gifs.length);
    const randomVhsGifIndex = Math.floor(Math.random() * vhsGifs.length);

    setShowVhsGif(true);

    const audio = new Audio(vhsSound);
    audio.play();

    setTimeout(() => {
      setShowVhsGif(false);
      setCurrentGif(gifs[randomIndex]);
    }, 200);
  }, [gifs]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'b' || e.key === 'B') {
        changeGifWithVhsEffect();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [changeGifWithVhsEffect]);

  const handleLoaderFinish = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading ? (
        <CustomLoader onFinish={handleLoaderFinish} />
      ) : (
        <div>
          <About />
          <div
            className="background-container"
            style={{
              backgroundImage: `url(${currentGif})`,
              transition: 'background-image 0.1s ease-in-out',
            }}
          >
            <div className="vhs"></div>
            {showVhsGif && (
              <div
                className="vhs-gif-container"
                style={{
                  backgroundImage: `url(${vhsGifs[Math.floor(Math.random() * vhsGifs.length)]})`,
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  width: '100%',
                  height: '100%',
                  backgroundSize: 'cover',
                  zIndex: '15',
                  opacity: '1',
                  animation: 'fadeOut 0.1s ease-in-out forwards',
                }}
              ></div>
            )}
          </div>
          <Player songTitle="lofi beats to study and relax to" />
        </div>
      )}
    </>
  );
};

export default App;
