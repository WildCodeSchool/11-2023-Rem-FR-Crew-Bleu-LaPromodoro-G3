import Presentateur from "../components/Presentateur";
import Navbar2 from "../components/Navbar2";
import VisuelMinuteur from "../components/VisuelMinuteur";
import "../styles/Quiz.css";

function Quiz() {
  return (
    <div>
      <Navbar2 />
      <Presentateur
        goodTexts="Accueil"
        idContainer="quizPresPosition"
        idSpeech="quizSpeechPosition"
      />
      <VisuelMinuteur />
    </div>
  );
}

export default Quiz;
