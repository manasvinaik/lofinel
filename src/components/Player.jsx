import React, { useState, useRef, useEffect, useCallback } from 'react';
import Utility from './Utility';

const lofiTracks = [
  '/assets/music/lofimusic/track1.mp3',
  '/assets/music/lofimusic/track2.mp3',
  '/assets/music/lofimusic/track3.mp3',
  '/assets/music/lofimusic/track4.mp3',
  '/assets/music/lofimusic/track5.mp3',
  '/assets/music/lofimusic/track6.mp3',
  '/assets/music/lofimusic/track7.mp3',
  '/assets/music/lofimusic/track8.mp3',
  '/assets/music/lofimusic/track9.mp3',
];

const spaceTracks = [
  '/assets/music/spacemusic/track1.mp3',
  '/assets/music/spacemusic/track2.mp3',
  '/assets/music/spacemusic/track3.mp3',
  '/assets/music/spacemusic/track4.mp3',
  '/assets/music/spacemusic/track5.mp3',
];

const Player = ({ songTitle: initialSongTitle }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [barsOpacity, setBarsOpacity] = useState(
    Array(10)
      .fill(false)
      .map((_, i) => (i < 3 ? true : false)) 
  );
  const [isLofi, setIsLofi] = useState(true); 
  const [songTitle, setSongTitle] = useState(initialSongTitle || 'Lofi Beats to Study and Relax To');

  const audioRef = useRef(null);

  const currentTracks = isLofi ? lofiTracks : spaceTracks;

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying((prev) => !prev);
  };

  const playNextTrack = () => {
    const nextTrackIndex = (currentTrackIndex + 1) % currentTracks.length;
    setCurrentTrackIndex(nextTrackIndex);
  };

  const playPrevTrack = () => {
    const prevTrackIndex = (currentTrackIndex - 1 + currentTracks.length) % currentTracks.length;
    setCurrentTrackIndex(prevTrackIndex);
  };

  const switchMusicMode = useCallback(() => {
    setIsLofi((prev) => !prev);
    setCurrentTrackIndex(0); 
    setSongTitle(isLofi ? 'Ambient Space Music' : 'Lofi Beats to Study and Relax To');
  }, [isLofi]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = currentTracks[currentTrackIndex];
      if (isPlaying) {
        audioRef.current.play().catch((error) => {
          console.error('Error playing audio:', error);
        });
      }
    }
  }, [currentTrackIndex, currentTracks, isPlaying]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 's' || e.key === 'S') {
        switchMusicMode();
      }
      
      if (e.key === ' ' || e.key === 'Spacebar') {
        togglePlayPause();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [togglePlayPause, switchMusicMode]);

  const updateBarsOpacity = (index) => {
    setBarsOpacity((prev) => {
      const newBars = prev.map((_, i) => i <= index); 
      adjustVolume(newBars.filter(Boolean).length); 
      return newBars;
    });
  };

  const adjustVolume = (activeBars) => {
    const volume = activeBars / barsOpacity.length; 
    if (audioRef.current) {
      audioRef.current.volume = volume; 
    }
  };

  useEffect(() => {
    const playAudio = async () => {
      if (audioRef.current) {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (error) {
          console.error('Auto-play failed:', error);
        }
      }
    };
    playAudio(); 
  }, []); 
  return (
    <div>
      <Utility isPlaying={isPlaying} />
      <div className="player-container">
        <div className="player-controls">
          <button
            onClick={playPrevTrack}
            aria-label="Previous track"
            className="player-icon-button"
          >
            <img
              src="/assets/forward.png"
              alt="Previous track"
              className="player-icon flip-icon"
            />
          </button>
          <button
            onClick={togglePlayPause}
            aria-label={isPlaying ? 'Pause' : 'Play'}
            className="player-icon-button"
          >
            <img
              src={isPlaying ? '/assets/pause.png' : '/assets/play.png'}
              alt={isPlaying ? 'Pause' : 'Play'}
              className="player-icon"
            />
          </button>
          <button
            onClick={playNextTrack}
            aria-label="Next track"
            className="player-icon-button"
          >
            <img
              src="/assets/forward.png"
              alt="Next track"
              className="player-icon"
            />
          </button>
          <div className="progress-bars">
            {barsOpacity.map((isFull, index) => (
              <div
                key={index}
                className={`progress-bar ${isFull ? 'full-opacity' : 'low-opacity'}`}
                onClick={() => updateBarsOpacity(index)}
              ></div>
            ))}
          </div>

          <div className="switch-wrapper">
            <button
              onClick={switchMusicMode}
              aria-label="Switch Music"
              className="player-icon-button switch-button"
            >
              <img
                src="/assets/switch.png"
                alt="Switch Music"
                className="player-icon"
              />
            </button>
            <span className="tooltip">Switch Station</span>
          </div>
        </div>
        <div className="song-info">
          <p className="song-title">{songTitle || `Track ${currentTrackIndex + 1}`}</p>
        </div>
        <audio ref={audioRef} onEnded={playNextTrack} />
      </div>

      {/* Invis div */}
      <div
        onClick={togglePlayPause} 
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '20rem',
          height: '20rem',
          backgroundColor: 'transparent', // Invisible
          zIndex: 100, 
        }}
      />
    </div>
  );
};

export default Player;
