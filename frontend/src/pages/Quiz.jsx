import Presentateur from "../components/Presentateur";
import Navbar2 from "../components/Navbar2";
// import backgroundMusicFile from "../assets/8-bit-arcade-138828.mp3";
// import BackgroundMusic from "../components/BackgroundMusic";
import "./Quiz.css";

function Quiz() {
  return (
    <div>
      {/* <BackgroundMusic musicUrl={backgroundMusicFile} volume={0.009} /> */}
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
