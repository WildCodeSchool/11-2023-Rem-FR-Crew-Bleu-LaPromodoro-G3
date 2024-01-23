import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ButtonNext from "./ButtonNext";
import VisuelMinuteur from "./VisuelMinuteur";
import "../styles/QuizDisplay.css";

// eslint-disable-next-line react/prop-types
function QuizDisplay({ questionsData }) {
  console.info(questionsData);

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
      // Si toutes les questions ont été répondues setQuiCompleted recoit true dans son état et le resultat s'affichera sur l'écran à la place de quiz
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
              <VisuelMinuteur className="hideVisuelMinuteur" />
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
