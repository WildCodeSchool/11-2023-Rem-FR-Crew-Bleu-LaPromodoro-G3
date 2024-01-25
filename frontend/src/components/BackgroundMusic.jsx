/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/button-has-type */
import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import {
  FaPlay,
  FaPause,
  FaVolumeDown,
  FaVolumeUp,
  FaVolumeMute,
} from "react-icons/fa";
import "../styles/BackgroundMusic.css";

function BackgroundMusic({ musicUrl, volume = 1.0 }) {
  const audioRef = useRef(null);
  const [currentVolume, setCurrentVolume] = useState(volume);

  // Lecture (play/pause) de la musique
  const togglePlay = () => {
    const playAudio = audioRef.current.paused
      ? audioRef.current.play()
      : audioRef.current.pause();
    if (playAudio !== undefined) {
      playAudio.catch(() => {
        console.error("La lecture de la musique a été bloquée");
      });
    }
  };

  // Configuration du volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = currentVolume;
    }
  }, [currentVolume]);

  // Ajustement du volume
  const adjustVolume = (value) => {
    let newVolume = currentVolume + value;
    newVolume = Math.min(1.0, Math.max(0.0, newVolume)); // Assure que le volume est entre 0 et 1
    setCurrentVolume(newVolume);
  };

  return (
    <div className="ambientMusic">
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio ref={audioRef} src={musicUrl} loop />
      <div className="musicControls">
        <button
          className="btnMusic"
          onClick={togglePlay}
          style={{ cursor: "pointer" }}
        >
          {audioRef.current && !audioRef.current.paused ? (
            <FaPause />
          ) : (
            <FaPlay />
          )}
        </button>
        <button
          className="volumeControl"
          onClick={() => adjustVolume(-0.1)}
          style={{ cursor: "pointer" }}
        >
          <FaVolumeDown />
        </button>
        <button
          className="volumeControl"
          onClick={() => adjustVolume(0.1)}
          style={{ cursor: "pointer" }}
        >
          <FaVolumeUp />
        </button>
        <button
          className="volumeControl"
          onClick={() => setCurrentVolume(0)}
          style={{ cursor: "pointer" }}
        >
          <FaVolumeMute />
        </button>
      </div>
    </div>
  );
}

// Définition des propTypes
BackgroundMusic.propTypes = {
  musicUrl: PropTypes.string.isRequired,
  volume: PropTypes.number,
};

// Définition des defaultProps
BackgroundMusic.defaultProps = {
  volume: 1.0,
};

export default BackgroundMusic;
