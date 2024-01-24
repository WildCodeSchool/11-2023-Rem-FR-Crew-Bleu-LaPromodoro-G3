/* eslint-disable no-unused-vars */
import { useLocation, Link } from "react-router-dom";
import { useState, useCallback, useEffect } from "react";
import Presentateur from "../components/Presentateur";
import Navbar2 from "../components/Navbar2";
import VisuelMinuteur from "../components/VisuelMinuteur";
import picture from "../assets/canard.png";
import Modal from "../components/Modal";
import { images } from "../assets/images/images";
import { useTheme } from "../Context/ThemeContext";
import "../styles/Quiz.css";
import ButtonNext from "../components/ButtonNext";
import cinquantCinquante from "../assets/images/questionmoitié.png";
import sablier from "../assets/images/sablier.png";

function Quiz() {
  const location = useLocation();
  const selectedCategory = location.state?.selectedCategory || "CultureG";
  const defaultDifficulty = "hard";
  const [questionsData, setQuestionsData] = useState([null]);
  const [isImageClicked, setIsImageClicked] = useState(false);
  const [initialProgress, setInitialProgress] = useState(15);
  const [progress, setProgress] = useState(15);
  const [isAnswerSelected, setIsAnswerSelected] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);

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
  const questions = [];
  // on recupere les questions de quiz avec map on les mets dans array questions
  questionsData.map((question) => questions.push(question));
  // eslint-disable-next-line react/prop-types
  const totalQuestions = questions.length;
  // State pour vérifier l'index de question
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // Ici on stocke la question, les options et la réponse correcte affichée
  const currentQuestion = questions[currentQuestionIndex];
  // State pour vérifier si la personne a déjà choisi sa réponse
  const [answered, setAnswered] = useState(false);
  // State pour pouvoir comparer la réponse choisie avec la réponse correcte
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  // State pour compter les bonnes réponses de l'utilisateur
  const [countScore, setCountScore] = useState(0);
  // State pour gérer l'affichage du résultat final
  const [quizCompleted, setQuizCompleted] = useState(false);
  // Fonction pour comparer les réponses
  const [correctAnswerToShow, setCorrectAnswerToShow] = useState(null);

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
  const handleImageClick = () => {
    setIsImageClicked(true);
    setTimeout(() => {
      setIsImageClicked(false);
    }, 5000); // barre de progression en pause pendant 5 secondes
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [avatarProfile, setAvatarProfile] = useState(picture);
  // eslint-disable-next-line no-unused-vars
  const [userInformation, setUserInformation] = useState({
    pseudo: "",
    theme: "",
    avatarIndex: null,
  });
  const { selectedTheme } = useTheme();
  const updateUserInformation = useCallback(
    (pseudo, theme, selectedImageIndex) => {
      setUserInformation({ pseudo, theme, avatarIndex: selectedImageIndex });
    },
    []
  );

  const changeAvatarProfile = useCallback((index) => {
    setAvatarProfile(images[index]);
  }, []);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);
  // const handleOptionClick = (option) => {
  //   if (!answered) {
  //     setSelectedAnswer(option);
  //     setAnswered(true);
  //     setIsAnswerSelected(true); // Arrête la barre de progression
  //   }
  // };
  return (
    <div style={{ backgroundImage: `url(${selectedTheme})` }}>
      <Navbar2 openModal={openModal} avatarProfile={avatarProfile} />
      <div className="bonusOption">
        <img
          className="bonusLogo"
          src={cinquantCinquante}
          alt="Cinquant Cinquante"
        />
        <img
          className="bonusLogo"
          src={sablier}
          alt="Sablier"
          onClick={handleImageClick}
        />
      </div>
      <Presentateur
        goodTexts="Results"
        idContainer="quizPresPosition"
        idSpeech="quizSpeechPosition"
      />

      <Modal
        showModal={isModalOpen}
        setShowModal={closeModal}
        changeAvatarProfile={changeAvatarProfile}
        updateUserInformation={updateUserInformation}
      />
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
                {currentQuestion.options.map((option, index) => {
                  // Calculer la classe du bouton
                  let buttonClass = `option option${index}`;
                  if (correctAnswerToShow) {
                    if (option === correctAnswerToShow) {
                      buttonClass += " correctOption";
                    } else if (option === selectedAnswer) {
                      buttonClass += " wrongOption";
                    }
                  }

                  return (
                    <button
                      key={option.index}
                      className={buttonClass}
                      type="submit"
                      onClick={() => {
                        if (!answered && !timeElapsed) {
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
              <ButtonNext onClick={handleNextQuestion} />
            </>
          ) : (
            <p>Fin du quiz</p>
          )}
        </div>
      )}

      {!quizCompleted && (
        <VisuelMinuteur
          initialProgress={progress}
          setProgress={setProgress}
          timeElapsed={timeElapsed}
          setTimeElapsed={setTimeElapsed}
          isAnswerSelected={isAnswerSelected}
        />
      )}
    </div>
  );
}

export default Quiz;
