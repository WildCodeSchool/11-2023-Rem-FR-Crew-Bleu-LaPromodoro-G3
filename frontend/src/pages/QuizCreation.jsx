import { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import Presentateur from "../components/Presentateur";
import Navbar2 from "../components/Navbar2";
import "../styles/QuizCreation.css";
import QuizViewer from "../components/QuizViewer";
import Footer from "../components/Footer";

// stocker les questions, la question et la réponse actuelles, et l'erreur
function QuizCreator() {
  const formRef = useRef(null);
  const storedQuestions = JSON.parse(localStorage.getItem("quizQuestions"));

  const [questions, setQuestions] = useState(storedQuestions || []);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [currentCategory, setCurrentCategory] = useState("");
  // const [currentId, setCurrentId] = useState("");
  const [currentDifficulty, setCurrentDifficulty] = useState("easy");
  const [currentOption, setCurrentOption] = useState("");
  const [error, setError] = useState(null);
  const clearLocalStorageAndResetQuestions = () => {
    localStorage.removeItem("quizQuestions");
    setQuestions([]);
  };
  const maxQuestions = 15;
  const maxOptions = 4;
  useEffect(() => {
    const loadedQuestions =
      JSON.parse(localStorage.getItem("quizQuestions")) || [];
    setQuestions(loadedQuestions);
  }, []);
  const saveToLocalStorage = (data) => {
    localStorage.setItem("quizQuestions", JSON.stringify(data));
  };
  // ajouter une nouvelle question
  const handleAddQuestion = () => {
    setError(null);
    if (!currentQuestion.trim()) {
      setError("La question ne peut pas être vide");
      return;
    }
    if (questions.length < maxQuestions) {
      const updatedQuestions = [
        ...questions,
        {
          category: currentCategory,
          difficulty: currentDifficulty,
          question: currentQuestion,
          options: [],
        },
      ];
      setQuestions(updatedQuestions);
      setCurrentQuestion("");
      setCurrentCategory("");
      setCurrentDifficulty("easy");
      // Réinitialisez currentOption à une chaîne vide
      setCurrentOption(""); // Ajoutez cette ligne
      // Stockez les données mises à jour dans le local storage
      saveToLocalStorage(updatedQuestions);
    } else {
      setError("Impossible d'ajouter plus de 15 questions");
    }
  };

  // ajouter une nouvelle réponse à une question spécifique
  const handleAddOption = (questionIndex) => {
    setError(null);
    if (!currentOption.trim()) {
      setError("La réponse ne peut pas être vide");
      return;
    }

    const newOption = {
      text: currentOption,
    };

    const updatedQuestions = questions.map((question, index) => {
      if (index === questionIndex && question.options.length < maxOptions) {
        return {
          ...question,
          options: [...question.options, newOption],
        };
      }
      if (index === questionIndex) {
        setError("Impossible d'ajouter plus de 4 réponses à une question");
      }
      return question;
    });

    setQuestions(updatedQuestions);
    setCurrentOption("");
    saveToLocalStorage(updatedQuestions);
  };

  // marquer une réponse comme correcte
  const handleMarkAsCorrectOption = (questionIndex, optionIndex) => {
    const newQuestions = questions.map((question, qIndex) => {
      if (qIndex === questionIndex) {
        return {
          ...question,
          options: question.options.map((option, oIndex) => ({
            ...option,
            correct_option: oIndex === optionIndex,
          })),
        };
      }
      return question;
    });
    // eslint-disable-next-line no-restricted-syntax
    console.log(newQuestions);
    setQuestions(newQuestions);
    saveToLocalStorage(newQuestions);
  };

  // sauvegarder le quiz
  const handleSaveQuiz = async () => {
    if (questions.some((question) => question.options.length === 0)) {
      setError("Chaque question doit avoir au moins une réponse.");
      return;
    }

    try {
      // tableau de questions
      const questionsToSave = questions.map((question) => ({
        category: question.category,
        difficulty: question.difficulty,
        question: question.question,
        options: question.options.map((option) => option.text),
        correct_option: question.options.findIndex(
          (option) => option.correct_option
        ),
      }));

      // sauvegarder les questions
      const response = await fetch("http://localhost:4748/quiz/question/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(questionsToSave),
      });

      if (!response.ok) {
        throw new Error("La réponse du réseau n'était pas valide");
      }

      const data = await response.json();
      // eslint-disable-next-line no-restricted-syntax
      console.log("Succès :", data);
      toast("Quiz sauvegardé avec succès!", { toastId: "uniqueId" });
      clearLocalStorageAndResetQuestions();
    } catch (catchError) {
      console.error("Erreur :", error);
    }
  };

  return (
    <div>
      <div className="quizzCreated">
        <h1>Créateur de Quiz</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <h2>Ajouter une Question</h2>
        <form ref={formRef}>
          <label htmlFor="category">Catégorie :</label>
          <input
            className="Create"
            type="text"
            name="category"
            value={currentCategory}
            onChange={(e) => setCurrentCategory(e.target.value)}
          />

          <label htmlFor="difficulty">Niveau de difficulté :</label>
          <select
            className="Create"
            name="difficulty"
            value={currentDifficulty}
            onChange={(e) => setCurrentDifficulty(e.target.value)}
          >
            <option value="easy">Facile</option>
            <option value="medium">Moyen</option>
            <option value="hard">Difficile</option>
          </select>

          <label htmlFor="question">Question :</label>
          <textarea
            className="Create"
            name="question"
            value={currentQuestion}
            onChange={(e) => setCurrentQuestion(e.target.value)}
          />

          <button
            className="addQuestion"
            type="button"
            onClick={handleAddQuestion}
          >
            Ajouter Question
          </button>
        </form>
        {questions.map((question, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={index}>
            <h3>{question.question}</h3>
            <h4>Ajouter Réponse</h4>
            <input
              className="Create"
              value={currentOption}
              onChange={(e) => setCurrentOption(e.target.value)}
            />
            <button
              className="addAnswer"
              type="button"
              onClick={() => handleAddOption(index)}
            >
              Ajouter Réponse
            </button>
            {question.options.map((option, optionIndex) => (
              // eslint-disable-next-line react/no-array-index-key
              <div key={optionIndex}>
                <p>{option.text}</p>
                <button
                  className="markCorrect"
                  type="button"
                  onClick={() => handleMarkAsCorrectOption(index, optionIndex)}
                >
                  Marquer comme correcte
                </button>
              </div>
            ))}
          </div>
        ))}
        <button className="saveQuiz" type="button" onClick={handleSaveQuiz}>
          Enregistrer le Quiz
        </button>
        <div className="popup">
          <ToastContainer
            position="bottom-left"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            closeButton={false}
          />
        </div>
      </div>
      <div className="navPosition">
        <Navbar2 />
      </div>

      <div className="quizCreationPresenter">
        <Presentateur
          goodTexts="Creation"
          idContainer="presenterCustom"
          idSpeech="speechContainer"
        />
      </div>
      <QuizViewer questions={questions} />
      <Footer />
    </div>
  );
}

export default QuizCreator;
