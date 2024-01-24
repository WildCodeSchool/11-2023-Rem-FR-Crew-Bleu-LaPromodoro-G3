/* eslint-disable react/prop-types */
import ProgressBar from "@ramonak/react-progress-bar";
import { useEffect } from "react";
import "../styles/VisuelMinuteur.css";

function VisuelMinuteur({
  initialProgress,
  setProgress,
  timeElapsed,
  setTimeElapsed,
  isAnswerSelected,
}) {
  useEffect(() => {
    let interval;

    if (!isAnswerSelected && initialProgress > 0) {
      interval = setInterval(() => {
        setProgress((prevState) => prevState - 1);
      }, 1000);
    } else if (initialProgress === 0 && !timeElapsed) {
      setTimeElapsed(true);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [
    initialProgress,
    isAnswerSelected,
    setProgress,
    timeElapsed,
    setTimeElapsed,
  ]);
  return (
    <div className="container">
      <ProgressBar
        completed={`${initialProgress}`}
        maxCompleted={15}
        className="barCompleted"
        bgColor="#f4091a"
      />
    </div>
  );
}

export default VisuelMinuteur;
