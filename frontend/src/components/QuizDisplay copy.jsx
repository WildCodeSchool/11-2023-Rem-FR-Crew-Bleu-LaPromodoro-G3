import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ButtonNext from "./ButtonNext";
import "../styles/QuizDisplay.css";

function QuizDisplay() {
  const questionsData = [
    {
      questions: [
        {
          id: "30001AA",
          question:
            "Sous quel autre nom connaît-on mieux le chlorure de sodium ?",
          options: ["Le sucre", "Le sel", "Le poivre", "La moutarde"],
          correct_option: "Le sel",
        },
        {
          id: "30002AA",
          question: "Quel est le plus grand océan du monde ?",
          options: [
            "Océan Atlantique",
            "Océan Pacifique",
            "Océan Indien",
            "Océan Arctique",
          ],
          correct_option: "Océan Pacifique",
        },
        {
          id: "30003AA",
          question: "Quel est le symbole chimique du fer  ?",
          options: ["Fe", "Fr", "Fi", "Fa"],
          correct_option: "Fe",
        },
        {
          id: "30004AA",
          question:
            "Quel volcan italien a enseveli la ville de Pompéi le 24 août de l'an 79 ?",
          options: [
            "Le Vésuve",
            "L'Etna",
            "Le Mont Barbaro",
            "Eyjafjallajökull",
          ],
          correct_option: "Le Vésuve",
        },
        {
          id: "30005AA",
          question: "En quelle année a eu lieu la chute du mur de Berlin ?",
          options: ["1889", "1991", "1961", "1989"],
          correct_option: "1989",
        },
        {
          id: "30006AA",
          question: "Combien compte-t-on de couleurs primaires ?",
          options: ["3", "4", "5", "6"],
          correct_option: "3",
        },
        {
          id: "30007AA",
          question: "Quelle est la langue maternelle la plus parlée au monde ?",
          options: ["Le mandarin", "L'anglais", "l'espagnol", "le français"],
          correct_option: "Le mandarin",
        },
        {
          id: "30008AA",
          question: "Dans quel pays peut-on visiter la Sagrada Familia ?",
          options: ["Mexique", "Portugal", "Espagne", "Brésil"],
          correct_option: "Espagne",
        },
        {
          id: "30009AA",
          question: "Qui est considéré comme “le père” de la bombe atomique ?",
          options: [
            "Albert Einstein",
            "Rudolf Diesel",
            "Robert Oppenheimer",
            "Enrico Fermi",
          ],
          correct_option: "Robert Oppenheimer",
        },
        {
          id: "30010AA",
          question:
            "Dans la mythologie grecque, quelle créature est chargée de garder l’entrée des enfers ?",
          options: [
            "Le minotaure",
            "Cerbère",
            "  Un titan",
            " Un hécatonchire ",
          ],
          correct_option: "Cerbère",
        },
      ],
    },
  ];
  console.info(questionsData);
  // Transformation des questionsData pour obtenir une seule liste de questions
  const questions = questionsData.flatMap((category) => category.questions);
  const totalQuestions = questions.length;
  // State pour vérifier l'index de question
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

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
