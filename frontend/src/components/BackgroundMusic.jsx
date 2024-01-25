import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import playButtonImg from "../assets/images/music.png";
import "../styles/BackgroundMusic.css";

function BackgroundMusic({ musicUrl, volume = 1.0 }) {
  const audioRef = useRef(null);

  // lecture (play/pause)de la musique
  const togglePlay = () => {
    const playAudio = audioRef.current.paused
      ? audioRef.current.play()
      : audioRef.current.pause();
    if (playAudio !== undefined) {
      playAudio.catch(() => {
        console.error("Lalecture de la musique a été bloquée");
      });
    }
  };

  // configuration du volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  return (
    <div className="ambientMusic ">
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio ref={audioRef} src={musicUrl} loop />
      <img
        className="btnMusic"
        src={playButtonImg}
        alt="Play/Pause"
        onClick={togglePlay}
        style={{ cursor: "pointer" }}
      />
      {/* <span>Play/Pause</span> Ajoutez le texte ici */}
    </div>
  );
}

// définition de mes props
BackgroundMusic.propTypes = {
  musicUrl: PropTypes.string.isRequired,
  volume: PropTypes.number,
};

BackgroundMusic.defaultProps = {
  volume: 1.0,
};

export default BackgroundMusic;
