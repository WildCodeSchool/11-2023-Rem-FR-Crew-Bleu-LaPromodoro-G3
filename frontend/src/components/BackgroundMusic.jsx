import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

function BackgroundMusic({ musicUrl, volume = 1.0 }) {
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  return (
    <div>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio ref={audioRef} src={musicUrl} loop />
      <button type="button" className="btnMusic" onClick={togglePlay}>
        Play/Pause
      </button>
    </div>
  );
}

BackgroundMusic.propTypes = {
  musicUrl: PropTypes.string.isRequired,
  volume: PropTypes.number,
};

BackgroundMusic.defaultProps = {
  volume: 1.0,
};

export default BackgroundMusic;
