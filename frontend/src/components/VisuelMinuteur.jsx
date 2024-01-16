import { useState, useEffect } from "react";
import ProgressBar from "@ramonak/react-progress-bar";

import "./VisuelMinuteur.css";

function VisuelMinuteur() {
  const [progress, setProgress] = useState(50);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => (prevProgress > 0 ? prevProgress - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <ProgressBar
        className="progressBar minuteur"
        completed={`${progress}`}
        barContainerClassName="container"
        completedClassName="barCompleted"
        labelClassName="label"
      />
    </div>
  );
}

export default VisuelMinuteur;
