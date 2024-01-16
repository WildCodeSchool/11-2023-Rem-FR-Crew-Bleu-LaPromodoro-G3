// import { useState, useEffect } from "react";
import Presentateur from "../components/Presentateur";
import Navbar2 from "../components/Navbar2";
import QuizOptions from "../components/QuizOptions";
import ButtonNext from "../components/ButtonNext";
import "../styles/Quiz.css";

function Quiz() {
  // const [quizData, setQuizData] = useState("Welcome to Quiz");

  // useEffect(() => {
  //   fetch("http://localhost:4000/category/easy")
  //     .then((res) => res.json())
  //     .then((data) => setQuizData(data));
  // }, []);

  return (
    <div>
      <Navbar2 />
      <Presentateur
        goodTexts="Accueil"
        idContainer="quizPresPosition"
        idSpeech="quizSpeechPosition"
      />
      <QuizOptions />
      <ButtonNext />
    </div>
  );
}

export default Quiz;
