import { useState, useEffect } from "react";
import Presentateur from "../components/Presentateur";
import Navbar2 from "../components/Navbar2";
import QuizDisplay from "../components/QuizDisplay";
import "../styles/Quiz.css";

function Quiz() {
  const [quizData, setQuizData] = useState("Welcome to Quiz");

  useEffect(() => {
    fetch("http://localhost:4747/quiz/all")
      .then((res) => res.json())
      .then((data) => setQuizData(data));
  }, []);
  console.info(quizData);

  return (
    <div>
      <Navbar2 />
      <Presentateur
        goodTexts="Accueil"
        idContainer="quizPresPosition"
        idSpeech="quizSpeechPosition"
      />
      <QuizDisplay id="quizDisplay" />
    </div>
  );
}

export default Quiz;
