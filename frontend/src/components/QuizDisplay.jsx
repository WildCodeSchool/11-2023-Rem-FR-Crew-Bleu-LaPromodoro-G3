/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ButtonNext from "./ButtonNext";
import "../styles/QuizDisplay.css";

function QuizDisplay({ questionsData }) {
  const questions = [];
  questionsData.map((question) => questions.push(question));
  console.info(questions);
  // eslint-disable-next-line react/prop-types
  const totalQuestions = questions.length;
  console.info(totalQuestions);
  // State pour vérifier l'index de question
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const currentQuestion = questions[currentQuestionIndex];
  console.info(currentQuestion);
  // State pour vérifier si la personne a déjà choisi sa réponse
  const [answered, setAnswered] = useState(false);
  // State pour pouvoir comparer la réponse choisie avec la réponse correcte
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  // State pour compter les bonnes réponses de l'utilisateur
  const [countScore, setCountScore] = useState(0);
  // State pour gérer l'affichage du résultat final
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Fonction pour comparer les réponses
  const checkOption = () => {
    if (answered) {
      const correctOption = currentQuestion.correct_option;
      if (selectedAnswer === correctOption) {
        setCountScore(countScore + 1);
      }
    }
  };
  useEffect(() => {
    // Cette fonction sera appelée à chaque mise à jour de selectedAnswer pour comparer les réponses
    checkOption();
  }, [selectedAnswer]);

  // Fonction pour passer à la question suivante
  const handleNextQuestion = () => {
    setAnswered(false);
    setSelectedAnswer(null);
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Si toutes les questions ont été répondues, vous pouvez ajouter une logique ici
      setQuizCompleted(true);
    }
  };

  return (
    <div>
      {quizCompleted ? (
        <div className="finalScore">
          <div className="messageScore">
            <p>{`Ton score finale est ${countScore} / 10`}</p>
          </div>
          <div>
            <Link to="/">
              <button type="button" className="buttonHomePage">
                Page d'accueil
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="quizDisplay">
          <div id="questionDisplay">
            <p>{currentQuestion.question}</p>
          </div>
          <div id="quizOptions">
            {currentQuestion.options.map((option, index) => (
              <button
                className={`option ${`option${index}`} ${
                  // eslint-disable-next-line no-nested-ternary
                  selectedAnswer === option && answered
                    ? option === currentQuestion.correct_option
                      ? "correctOption"
                      : "wrongOption"
                    : "option"
                } `}
                type="submit"
                onClick={() => {
                  if (!answered) {
                    setSelectedAnswer(option);
                    setAnswered(true);
                  }
                }}
              >
                {option}
              </button>
            ))}
          </div>
          <ButtonNext onClick={handleNextQuestion} />
        </div>
      )}
    </div>
  );
}

export default QuizDisplay;
