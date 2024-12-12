import React, { useState, useEffect } from 'react';


const About = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  const handleFullscreen = () => {
    if (!isFullscreen) {
      const fullscreenMethods = [
        'requestFullscreen',
        'mozRequestFullScreen',
        'webkitRequestFullscreen',
        'msRequestFullscreen',
      ];
      for (let method of fullscreenMethods) {
        if (document.documentElement[method]) {
          document.documentElement[method]();
          break;
        }
      }
    } else {
      const exitFullscreenMethods = [
        'exitFullscreen',
        'mozCancelFullScreen',
        'webkitExitFullscreen',
        'msExitFullscreen',
      ];
      for (let method of exitFullscreenMethods) {
        if (document[method]) {
          document[method]();
          break;
        }
      }
    }
    setIsFullscreen(!isFullscreen); 
  };

  useEffect(() => {
    const onFullscreenChange = () => {
      const isFullscreenActive = document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement;
      setIsFullscreen(isFullscreenActive);
    };

    document.addEventListener('fullscreenchange', onFullscreenChange);
    document.addEventListener('webkitfullscreenchange', onFullscreenChange);
    document.addEventListener('mozfullscreenchange', onFullscreenChange);
    document.addEventListener('MSFullscreenChange', onFullscreenChange);

    
    return () => {
      document.removeEventListener('fullscreenchange', onFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', onFullscreenChange);
      document.removeEventListener('mozfullscreenchange', onFullscreenChange);
      document.removeEventListener('MSFullscreenChange', onFullscreenChange);
    };
  }, []);

  return (
    <div className="about-container">
      <div className="icons-wrapper">
        {/* Fullscreen Toggle Icon */}
        <div className="icon-wrapper">
          <img
            src={isFullscreen ? "/assets/minimize.png" : "/assets/maximize.png"}
            alt={isFullscreen ? "Minimize" : "Maximize"}
            className="icon maximize"
            onClick={handleFullscreen}
            aria-label={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
          />
          <p className="icon-text">{isFullscreen ? "Minimize" : "Fullscreen"}</p>
        </div>

        {/* LinkedIn Profile Icon */}
        <div className="icon-wrapper">
          <a
            href="https://www.linkedin.com/in/manasvinaik/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
          >
            <img
              src="/assets/heart.png"
              alt="Heart"
              className="icon heart"
            />
          </a>
          <p className="icon-text">Profile</p>
        </div>

        {/* About Section Icon */}
        <div className="icon-wrapper">
          <img
            src="/assets/about.png"
            alt="About"
            className="icon about"
            onClick={() => setShowInstructions(!showInstructions)}
            aria-label={showInstructions ? "Hide Instructions" : "Show Instructions"}
          />
          <p className="icon-text">About</p>
        </div>
      </div>

      {/* Instructions Section */}
      {showInstructions && (
        <div className="instructions">
          <p className="instruction-text">B: Change Background</p>
          <p className="instruction-text">S: Switch Music Stations</p>
          <img src="/assets/me.jpg" alt="Me" className="instagram-image" />
          <a
            href="https://www.instagram.com/mnsvinaik/"
            className="instagram-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Instagram"
          >
            Say Hi! @mnsvinaik
          </a>
        </div>
      )}
    </div>
  );
};

export default About;
