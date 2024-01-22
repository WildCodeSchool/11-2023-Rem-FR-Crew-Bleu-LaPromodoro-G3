import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Presentateur from "../components/Presentateur";
import Navbar2 from "../components/Navbar2";
import "../styles/QuizCreation.css";
import Footer from "../components/Footer";

function QuizCreator() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(`''`);
  const [currentAnswer, setCurrentAnswer] = useState(`''`);
  const [error, setError] = useState(null);

  const maxQuestions = 15;
  const maxAnswer = 4;

  const notify = () =>
    toast("Quiz sauvegardé avec succès!", { toastId: "unique_id" });

  const handleAddQuestion = () => {
    if (!currentQuestion.trim()) {
      setError("La question ne peut pas être vide");
      return;
    }
    if (questions.length < maxQuestions) {
      setQuestions([...questions, { text: currentQuestion, answers: [] }]);
      setCurrentQuestion("");
    } else {
      setError("Impossible d'ajouter plus de 15 questions");
    }
  };

  const handleAddAnswer = (questionIndex) => {
    if (!currentAnswer.trim()) {
      setError("La réponse ne peut pas être vide");
      return;
    }

    const updatedQuestions = questions.map((question, index) => {
      if (index === questionIndex) {
        if (question.answers.length < maxAnswer) {
          const newAnswer = { text: currentAnswer, isCorrect: false }; // Nouvelle réponse avec isCorrect: false par défaut
          return { ...question, answers: [...question.answers, newAnswer] };
        }
        setError("Impossible d'ajouter plus de 4 réponses à une question");
      }
      return question;
    });

    setQuestions(updatedQuestions);
    setCurrentAnswer("");
  };

  const handleMarkAsCorrect = (questionIndex, answerIndex) => {
    const newQuestions = questions.map((question, qIndex) => {
      if (qIndex === questionIndex) {
        return {
          ...question,
          answers: question.answers.map((answer, aIndex) => ({
            ...answer,
            isCorrect: aIndex === answerIndex,
          })),
        };
      }
      return question;
    });

    // eslint-disable-next-line no-restricted-syntax
    console.log(newQuestions); // Pour vérifier la nouvelle structure des questions
    setQuestions(newQuestions);
  };

  const handleSaveQuiz = async () => {
    if (questions.some((question) => question.answers.length === 0)) {
      setError("Chaque question doit avoir au moins une réponse.");
      return;
    }

    try {
      const response = await fetch("http://localhost:4747/quiz/all", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questions }),
      });

      if (response.ok) {
        // const data = await response.json();
        // eslint-disable-next-line no-restricted-syntax
        console.log("Quiz sauvegardé avec succès:");
        notify();

        // Réinitialiser les questions ou gérer la navigation
        setQuestions([]);
      } else {
        setError("Une erreur s'est produite lors de la sauvegarde du quiz.");
      }
    } catch (catchError) {
      console.error("Erreur:", catchError);
      setError("Une erreur s'est produite lors de la connexion à l'API.");
    }
  };

  return (
    <div>
      <div className="quizzCreated">
        <h1>Créateur de Quiz</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <h2>Ajouter une Question</h2>
        <input
          value={currentQuestion}
          onChange={(e) => setCurrentQuestion(e.target.value)}
        />
        <button type="button" onClick={handleAddQuestion}>
          Ajouter Question
        </button>
        {questions.map((question, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={index}>
            <h3>{question.text}</h3>
            <h4>Ajouter Réponse</h4>
            <input
              value={currentAnswer}
              onChange={(e) => setCurrentAnswer(e.target.value)}
            />
            <button type="button" onClick={() => handleAddAnswer(index)}>
              Ajouter Réponse
            </button>
            {question.answers.map((answer, answerIndex) => (
              // eslint-disable-next-line react/no-array-index-key
              <div key={answerIndex}>
                <p>{answer.text}</p>
                <button
                  type="button"
                  onClick={() => handleMarkAsCorrect(index, answerIndex)}
                >
                  Marquer comme correcte
                </button>
              </div>
            ))}
          </div>
        ))}
        <button type="button" onClick={handleSaveQuiz}>
          Enregistrer le Quiz
        </button>
      </div>
      <div className="navPosition">
        <Navbar2 />
      </div>
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
      <div className="quizCreationPresenter">
        <Presentateur
          goodTexts="Accueil"
          idContainer="presenterCustom"
          idSpeech="speechContainer"
        />
      </div>
      <Footer />
    </div>
  );
}

export default QuizCreator;
