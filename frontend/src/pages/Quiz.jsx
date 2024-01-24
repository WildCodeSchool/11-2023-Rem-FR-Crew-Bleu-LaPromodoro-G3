import { useLocation, Link } from "react-router-dom";
import { useState, useCallback, useEffect } from "react";
import Navbar2 from "../components/Navbar2";
import VisuelMinuteur from "../components/VisuelMinuteur";
import picture from "../assets/canard.png";
import Modal from "../components/Modal";
import { images } from "../assets/images/images";
import { useTheme } from "../Context/ThemeContext";
import "../styles/Quiz.css";
import ButtonNext from "../components/ButtonNext";
import AnimationQuiz from "../components/AnimationQuiz";

function Quiz() {
  const location = useLocation();
  const selectedCategory = location.state?.selectedCategory || "CultureG";
  console.info(`category ${selectedCategory}`);
  const defaultDifficulty = "hard";
  const [questionsData, setQuestionsData] = useState([null]);

  useEffect(() => {
    fetch(
      `http://localhost:4748/quiz/category/${selectedCategory}/difficulty/${defaultDifficulty}`
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
  console.info(questionsData.length);
  const questions = [];
  questionsData.map((question) => questions.push(question));
  console.info(questions);
  const totalQuestions = questions.length;
  console.info(totalQuestions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const currentQuestion = questions[currentQuestionIndex];
  console.info(currentQuestion);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [countScore, setCountScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const checkOption = () => {
    if (answered) {
      const correctOption = currentQuestion.correct_option;
      if (selectedAnswer === correctOption) {
        setCountScore(countScore + 1);
      }
    }
  };
  useEffect(() => {
    checkOption();
  }, [selectedAnswer]);

  const handleNextQuestion = () => {
    if (answered) {
      setAnswered(false);
      setSelectedAnswer(null);
      if (currentQuestionIndex < totalQuestions - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setQuizCompleted(true);
      }
    }
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

  return (
    <div style={{ backgroundImage: `url(${selectedTheme})` }}>
      <Navbar2 openModal={openModal} avatarProfile={avatarProfile} />
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
                <AnimationQuiz
                  key={currentQuestionIndex}
                  question={currentQuestion.question}
                  onAnimationComplete={handleNextQuestion}
                />
              </div>
              <div id="quizOptions">
                {currentQuestion.options.map((option, index) => (
                  <button
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
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
            </>
          ) : (
            <p>Fin du quiz</p>
          )}
        </div>
      )}
      <VisuelMinuteur />
    </div>
  );
}

export default Quiz;
