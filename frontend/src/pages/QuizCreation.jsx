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
  const notify = () => toast("Quiz sauvgardé avec succès!");

  const maxQuestions = 15;
  const maxAnswer = 4;

  const handleAddQuestion = () => {
    if (!currentQuestion.trim()) {
      setError(`'La question ne peut pas être vide'`);
      return;
    }
    if (questions.length < maxQuestions) {
      setQuestions([...questions, { text: currentQuestion, answers: [] }]);
      setCurrentQuestion(`''`);
      setError(null);
    } else {
      setError(`'Impossible d'ajouter plus de 15 questions'`);
    }
  };

  const handleAddAnswer = (questionIndex) => {
    if (!currentAnswer.trim()) {
      setError(`'La réponse ne peut pas être vide'`);
      return;
    }
    const updatedQuestions = questions.map((question, index) => {
      if (index === questionIndex) {
        return question.answers.length < maxAnswer
          ? { ...question, answers: [...question.answers, currentAnswer] }
          : question;
      }
      return question;
    });

    if (questions[questionIndex].answers.length >= maxAnswer) {
      setError(`'Impossible d'ajouter plus de 4 réponses à une question'`);
      return;
    }

    setQuestions(updatedQuestions);
    setCurrentAnswer(`''`);
    setError(null);
  };

  const handleSaveQuiz = () => {
    // eslint-disable-next-line no-restricted-syntax
    console.log(`'Quiz sauvegardé'`, questions);
    notify();
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
              <p id="response" key={answerIndex}>
                {answer}
              </p>
            ))}
            <button type="button" onClick={handleSaveQuiz}>
              Enregistrer le Quiz
            </button>
          </div>
        ))}
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
          goodTexts="Creation"
          idContainer="presenterCustom"
          idSpeech="speechContainer"
        />
      </div>
      <Footer />
    </div>
  );
}

export default QuizCreator;
