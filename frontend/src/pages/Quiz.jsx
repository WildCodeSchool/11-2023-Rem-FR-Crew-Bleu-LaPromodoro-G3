import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import QuizDisplay from "../components/QuizDisplay";
import Navbar2 from "../components/Navbar2";
import Presentateur from "../components/Presentateur";
import "../styles/Quiz.css";

function Quiz() {
  const location = useLocation();
  const selectedCategory = location.state?.selectedCategory || "Science";
  const defaultDifficulty = "hard";
  const [questionsData, setQuestionsData] = useState([]);

  useEffect(() => {
    fetch(
      `http://localhost:4747/quiz/category/${selectedCategory}/difficulty/${defaultDifficulty}`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data.questions)) {
          setQuestionsData(data.questions);
          console.info(data);
        } else {
          console.error("Invalid data structure received from the API.");
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des questions :", error);
      });
  }, [selectedCategory, defaultDifficulty]);

  console.info(questionsData);
  // const firstQuestion = questionsData.length > 0 ? questionsData[0] : null;

  return (
    <div>
      <Navbar2 />
      <Presentateur
        goodTexts="Results"
        idContainer="quizPresPosition"
        idSpeech="quizSpeechPosition"
      />
      <QuizDisplay id="quizDisplay" questionsData={questionsData} />
      {/* <div className="quizQuestions">
        {firstQuestion && (
          <div>
            <p id="questionDisplay">{firstQuestion.question}</p>
            <div id="choiceContainer">
              <div className="choice">{firstQuestion.options[0]}</div>
              <div className="choice">{firstQuestion.options[1]}</div>
              <div className="choice">{firstQuestion.options[2]}</div>
              <div className="choice">{firstQuestion.options[3]}</div>
            </div>
          </div>
        )}
      </div> */}
    </div>
  );
}

export default Quiz;
