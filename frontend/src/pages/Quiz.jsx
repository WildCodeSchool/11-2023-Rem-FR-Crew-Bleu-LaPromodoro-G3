import { useLocation } from "react-router-dom";
import { useState, useCallback, useEffect } from "react";
import Presentateur from "../components/Presentateur";
import Navbar2 from "../components/Navbar2";
import VisuelMinuteur from "../components/VisuelMinuteur";
import picture from "../assets/canard.png";
import Modal from "../components/Modal";
import { images } from "../assets/images/images";
import { useTheme } from "../Context/ThemeContext";
import DifficultySelector from "../components/DifficultySelector";
import QuizDisplay from "../components/QuizDisplay";
import "../styles/Quiz.css";

function Quiz() {
  const location = useLocation();
  const selectedCategory = location.state?.selectedCategory || "CultureG";
  // console.info(`category ${selectedCategory}`);
  const defaultDifficulty = "hard";
  const [questionsData, setQuestionsData] = useState([null]);
  const [selectedDifficulty, setSelectedDifficulty] =
    useState(defaultDifficulty);
  const handleDifficultyChange = (difficulty) => {
    setSelectedDifficulty(difficulty);
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
      <DifficultySelector
        selectedDifficulty={selectedDifficulty}
        onChangeDifficulty={handleDifficultyChange}
      />
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
      <QuizDisplay questionsData={questionsData} />
      <VisuelMinuteur />
    </div>
  );
}

export default Quiz;
