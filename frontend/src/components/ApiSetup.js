// import { useEffect, useState } from "react";

// function ApiSetup() {
//   const [data, setData] = useState(null);
//   const [error, setError] = useState(null);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [selectedDifficulty, setSelectedDifficulty] = useState("");
//   const [categories, setCategories] = useState([]);
//   const [difficulties, setDifficulties] = useState([]);
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [isCorrect, setIsCorrect] = useState(null);
//   const [score, setScore] = useState(0);

//   useEffect(() => {
//     fetch("http://localhost:4747/quiz/all")
//       .then((res) => {
//         if (!res.ok) {
//           throw new Error(`HTTP error! Status: ${res.status}`);
//         }
//         return res.json();
//       })
//       .then((data) => {
//         setData(data);
//         setCategories([...new Set(data.map((quiz) => quiz.category.name))]); // stocke le nom des catégories Set me permet de supprimer les doublons
//         setDifficulties([...new Set(data.map((quiz) => quiz.difficulty))]); // stocke le nom des difficultés Set me permet de supprimer les doublons
//       })
//       .catch((error) => {
//         console.error("erreur fecth:", error); // si pb affiche ça
//         setError(error.message);
//       });
//   }, []);

//   useEffect(() => {
//     setCurrentQuestionIndex(0); // Réinitialise l'index de la question lorsque la catégorie ou la difficulté change
//   }, [selectedCategory, selectedDifficulty]);

//   const handleCategoryChange = (event) => {
//     setSelectedCategory(event.target.value);
//   }; // mets à jour la variable selectedCategory quant au choix de la catégorie

//   const handleDifficultyChange = (event) => {
//     setSelectedDifficulty(event.target.value);
//   }; // mets à jour la variable  setSelectedDifficulty pour le choix de la difficulté quand je la choisis dans la liste

//   const filteredQuestions = data
//     ? data
//         .filter(
//           (quiz) =>
//             quiz.category.name === selectedCategory &&
//             quiz.difficulty === selectedDifficulty
//         )
//         .flatMap((quiz) => quiz.questions)
//     : [];
//   // en gros ternaire si data a des données tu filtres pour chaque quiz je veux que la category.name soit égal selectedCategory vu au dessus et idem pour la difficulté
//   // flatMap donne une seule liste de question
//   const goToNextQuestion = () => {
//     if (currentQuestionIndex < filteredQuestions.length - 1) {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//       setSelectedOption(null); // reinisialise la question quand je passe à la suivante
//       setIsCorrect(null); // idem mais pour la bonne réponse
//     } // me fait passer à la question suivante tant que je n'ai pas atteint la fin de mon tableau filteredQuestions
//   };
//   const handleOptionClick = (option) => {
//     if (selectedOption !== null) return;
//     const isAnswerCorrect =
//       option === filteredQuestions[currentQuestionIndex].correct_option; // compare ce que je choisis avec la bonne réponse
//     setSelectedOption(option); // mets à jour l'état de selectOption
//     setIsCorrect(isAnswerCorrect); // idem  voit si la réponse choisit est bonne ou non

//     if (isAnswerCorrect) {
//       setScore((prevScore) => prevScore + 1); // si elle est bonne le score fait +1
//     }
//   };
// }

// export default ApiSetup;
