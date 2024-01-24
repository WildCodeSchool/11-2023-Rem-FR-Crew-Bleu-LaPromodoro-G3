import React, { useState, useEffect } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import PropTypes from "prop-types";
import "../styles/VisuelMinuteur.css";

function VisuelMinuteur({ onTimeout }) {
  const [progress, setProgress] = useState(15);
  let interval;

  useEffect(() => {
    interval = setInterval(() => {
      setProgress((prevState) => {
        const newProgress = prevState > 0 ? prevState - 1 : 0;
        if (newProgress === 0) {
          clearInterval(interval);
          onTimeout();
        }
        return newProgress;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [onTimeout]);

  return (
    <div className="container">
      <ProgressBar
        completed={`${progress}`}
        maxCompleted={15}
        className="barCompleted"
        bgColor="#f4091a"
      />
    </div>
  );
}

VisuelMinuteur.propTypes = {
  onTimeout: PropTypes.func.isRequired,
};

export default VisuelMinuteur;
