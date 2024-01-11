import Presentateur from "../components/Presentateur";
import Navbar2 from "../components/Navbar2";
import "./Quiz.css";

function Quiz() {
  return (
    <div>
      <Navbar2 />
      <Presentateur
        goodTexts="Accueil"
        idContainer="quizPresPosition"
        idSpeech="quizSpeechPosition"
      />
    </div>
  );
}

export default Quiz;
