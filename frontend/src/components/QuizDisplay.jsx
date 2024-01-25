/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ButtonNext from "./ButtonNext";
import VisuelMinuteur from "./VisuelMinuteur";
import BadScore from "../assets/badScore.gif";
import GoodScore from "../assets/goodScore.gif";
import "../styles/QuizDisplay.css";

// eslint-disable-next-line react/prop-types
function QuizDisplay({ questionsData }) {
  console.info(questionsData);
  const [initialProgress, setInitialProgress] = useState(15);
  const [progress, setProgress] = useState(15);
  const [isAnswerSelected, setIsAnswerSelected] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);
  const [correctAnswerToShow, setCorrectAnswerToShow] = useState(null);
  // State pour vérifier si la personne a déjà choisi sa réponse
  const [answered, setAnswered] = useState(false);
  // State pour compter les bonnes réponses de l'utilisateur
  const [countScore, setCountScore] = useState(0);
  // State pour vérifier l'index de question
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // eslint-disable-next-line react/prop-types
  // State pour pouvoir comparer la réponse choisie avec la réponse correcte
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  // State pour gérer l'affichage du résultat final
  const [quizCompleted, setQuizCompleted] = useState(false);
  const questions = [];
  // on recupere les questions de quiz avec map on les mets dans array questions
  // eslint-disable-next-line react/prop-types
  questionsData.map((question) => questions.push(question));
  // eslint-disable-next-line react/prop-types
  const totalQuestions = questions.length;
  // Ici on stocke la question, les options et la réponse correcte affichée
  const currentQuestion = questions[currentQuestionIndex];

  const checkOption = () => {
    let scenario; // créé une variable qui va dépendre de answered et timeElapsed
    if (answered) {
      scenario = // Ici deux cas, si la personne répond ou si le temps est écoulé ce qui va paramettrer mon scénario
        selectedAnswer === currentQuestion.correct_option
          ? "correct"
          : "incorrect";
    } else if (timeElapsed) {
      scenario = "timeElapsed";
    }
    switch (scenario) {
      case "correct":
        // L'utilisateur a répondu correctement
        setCountScore(countScore + 1);
        setCorrectAnswerToShow(currentQuestion.correct_option);
        setShowAnswers(true);

        setIsAnswerSelected(true);
        break;

      case "incorrect":
        // L'utilisateur a répondu incorrectement
        setCorrectAnswerToShow(currentQuestion.correct_option);
        setShowAnswers(true);
        setIsAnswerSelected(true);
        break;

      case "timeElapsed":
        // Le temps est écoulé sans réponse
        setCorrectAnswerToShow(currentQuestion.correct_option);
        setShowAnswers(true);
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    // Appeler checkOption à chaque fois que selectedAnswer change ou que le temps s'écoule
    checkOption();
  }, [selectedAnswer, timeElapsed]);
  // Fonction pour passer à la question suivante
  const handleNextQuestion = () => {
    setAnswered(false);
    setSelectedAnswer(null);
    setShowAnswers(false);
    setCorrectAnswerToShow(null);
    setTimeElapsed(false);
    setIsAnswerSelected(false);
    setInitialProgress(15);
    if (currentQuestionIndex < totalQuestions - 1) {
      // Réinitialiser la barre de progression à la valeur initiale
      setProgress(initialProgress);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  return (
    <div>
      {quizCompleted ? (
        <div className="finalScore">
          <div className="messageScore">
            <p>{`Ton score final est ${countScore} / 10`}</p>
          </div>
          <div className="congratulationsMessage">
            {countScore <= 5 ? (
              <img src={BadScore} alt="badscore" />
            ) : (
              <img src={GoodScore} alt="goodscore" />
            )}
          </div>
          <div>
            <Link to="/" className="linkHomePage">
              <button type="button" className="buttonHomePage">
                Page d'accueil
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="quizDisplay">
          {currentQuestion ? (
            <>
              <div id="questionDisplay">
                <p>{currentQuestion.question}</p>
              </div>
              <div id="quizOptions">
                {currentQuestion.options.map((option, index) => {
                  let buttonClass = `option option${index}`;
                  if (showAnswers) {
                    if (option === currentQuestion.correct_option) {
                      buttonClass += " correctOption";
                    } else if (option === selectedAnswer) {
                      buttonClass += " wrongOption";
                    }
                  }
                  return (
                    <button
                      className={buttonClass}
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
                  );
                })}
              </div>
              {!quizCompleted && (
                <VisuelMinuteur
                  initialProgress={progress}
                  setProgress={setProgress}
                  timeElapsed={timeElapsed}
                  setTimeElapsed={setTimeElapsed}
                  isAnswerSelected={isAnswerSelected}
                />
              )}
              <ButtonNext onClick={handleNextQuestion} />
            </>
          ) : (
            <p>Fin du quiz</p>
          )}
        </div>
      )}
    </div>
  );
}

export default QuizDisplay;
