import ProgressBar from "@ramonak/react-progress-bar";
import { useEffect, useState } from "react";
import "../styles/VisuelMinuteur.css";

function VisuelMinuteur() {
  const [progress, setProgress] = useState(15);
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevState) => (prevState > 0 ? prevState - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="container">
      {/* {progress} */}
      <ProgressBar
        completed={`${progress}`}
        maxCompleted={15}
        className="barCompleted"
        bgColor="#f4091a"
      />
    </div>
  );
}

export default VisuelMinuteur;
