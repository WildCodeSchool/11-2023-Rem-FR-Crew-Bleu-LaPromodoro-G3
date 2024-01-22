import { useLocation } from "react-router-dom";
import { useState, useCallback, useEffect } from "react";
import Presentateur from "../components/Presentateur";
import Navbar2 from "../components/Navbar2";
import VisuelMinuteur from "../components/VisuelMinuteur";
import picture from "../assets/canard.png";
import Modal from "../components/Modal";
import { images } from "../assets/images/images";
import { useTheme } from "../Context/ThemeContext";
import QuizDisplay from "../components/QuizDisplay";
import "../styles/Quiz.css";

function Quiz() {
  const location = useLocation();
  const selectedCategory = location.state?.selectedCategory || "CultureG";
  console.info(`category ${selectedCategory}`);
  const defaultDifficulty = "hard";
  const [questionsData, setQuestionsData] = useState([null]);
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
  // console.info(questionsData.length);
  // const questions = [];
  // // on recupere les questions de quiz avec map on les mets dans array questions
  // questionsData.map((question) => questions.push(question));
  // console.info(questions);
  // // eslint-disable-next-line react/prop-types
  // const totalQuestions = questions.length;
  // console.info(totalQuestions);
  // // State pour vérifier l'index de question
  // const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // // Ici on stocke la question, les options et la réponse correcte affichée
  // const currentQuestion = questions[currentQuestionIndex];
  // console.info(currentQuestion);
  // // State pour vérifier si la personne a déjà choisi sa réponse
  // const [answered, setAnswered] = useState(false);
  // // State pour pouvoir comparer la réponse choisie avec la réponse correcte
  // const [selectedAnswer, setSelectedAnswer] = useState(null);
  // // State pour compter les bonnes réponses de l'utilisateur
  // const [countScore, setCountScore] = useState(0);
  // // State pour gérer l'affichage du résultat final
  // const [quizCompleted, setQuizCompleted] = useState(false);

  // // Fonction pour comparer les réponses
  // const checkOption = () => {
  //   if (answered) {
  //     // ici on stocke la reponse correcte qui se situe
  //     const correctOption = currentQuestion.correct_option;
  //     if (selectedAnswer === correctOption) {
  //       setCountScore(countScore + 1);
  //     }
  //   }
  // };
  // useEffect(() => {
  //   // Cette fonction sera appelée à chaque mise à jour de selectedAnswer pour comparer les réponses
  //   checkOption();
  // }, [selectedAnswer]);

  // // Fonction pour passer à la question suivante
  // const handleNextQuestion = () => {
  //   setAnswered(false);
  //   setSelectedAnswer(null);
  //   if (currentQuestionIndex < totalQuestions - 1) {
  //     setCurrentQuestionIndex(currentQuestionIndex + 1);
  //   } else {
  //     // Si toutes les questions ont été répondues setQuiCompleted recoit true dans son état et le resultat s'affichera sur l'écran à la place de quiz
  //     setQuizCompleted(true);
  //   }
  // };

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
