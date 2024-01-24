import { useLocation } from "react-router-dom";
import { useState, useCallback, useEffect } from "react";
import Presentateur from "../components/Presentateur";
import Navbar2 from "../components/Navbar2";
// import VisuelMinuteur from "../components/VisuelMinuteur";
import picture from "../assets/canard.png";
import Modal from "../components/Modal";
import { images } from "../assets/images/images";
import { useTheme } from "../Context/ThemeContext";
import DifficultySelector from "../components/DifficultySelector";
import ButtonStartQuiz from "../components/ButtonStartQuiz";
import QuizDisplay from "../components/QuizDisplay";
import "../styles/Quiz.css";

function Quiz() {
  const location = useLocation();
  const selectedCategory = location.state?.selectedCategory || "CultureG";
  const defaultDifficulty = "hard";
  const [questionsData, setQuestionsData] = useState([null]);
  const [selectedDifficulty, setSelectedDifficulty] =
    useState(defaultDifficulty);
  const handleDifficultyChange = (difficulty) => {
    setSelectedDifficulty(difficulty);
  };
  const [click, setClick] = useState(false);
  const [startQuiz, setStartQuiz] = useState("startQuizShow");

  const handleStartQuiz = () => {
    setClick(true);
    setStartQuiz("startQuizHide");
  };

  useEffect(() => {
    fetch(
      `http://localhost:4748/quiz/category/${selectedCategory}/difficulty/${selectedDifficulty}`
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
          // console.info(data);
        } else {
          console.error("Invalid data structure received from the API.");
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des questions :", error);
      });
  }, [selectedCategory, selectedDifficulty]);
  const [avatarProfile, setAvatarProfile] = useState(picture);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
      <div className={`startQuizShow ${startQuiz} `}>
        <DifficultySelector
          selectedDifficulty={selectedDifficulty}
          onChangeDifficulty={handleDifficultyChange}
        />
        <ButtonStartQuiz handleStartQuiz={handleStartQuiz} />
      </div>
      {click ? (
        <div>
          <QuizDisplay questionsData={questionsData} />
        </div>
      ) : (
        <div className="alertePresentateur">
          {" "}
          Choose difficulty and click on start{" "}
        </div>
      )}
      <Presentateur
        goodTexts="Results"
        idContainer="quizPresPosition"
        idSpeech="quizSpeechPosition"
      />
    </div>
  );
}

export default Quiz;
