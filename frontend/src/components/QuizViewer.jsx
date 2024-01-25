import React, { useEffect, useState } from "react";
import "../styles/QuizViewer.css";

function QuizViewer() {
  const [questionsAndAnswers, setQuestionsAndAnswers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error] = useState(null);

  useEffect(() => {
    fetch("http://localhost:4748/quiz/question-and-answers")
      .then((response) => {
        if (!response.ok) {
          throw new Error("La réponse du réseau n'était pas valide");
        }
        return response.json();
      })
      .then((data) => {
        setQuestionsAndAnswers(data);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <p>Chargement en cours...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <div className="inventoryCreation">
        {/* <h2 id="questionResponse">
          Questions et réponses enregistrées avec succès :
        </h2> */}
      </div>
      <div className="viewListing">
        {questionsAndAnswers && questionsAndAnswers.length > 0 && (
          <ul id="listingQuestion">
            {questionsAndAnswers.map((questionsArray, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <div key={index}>
                {questionsArray.map((question, questionIndex) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <div key={questionIndex}>
                    <h4>Question: {question.question}</h4>
                    <ul>
                      {question.options.map((option, optionIndex) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <li key={optionIndex}>
                          Réponse: {option}
                          {question.correct_option === optionIndex && (
                            <span style={{ color: "green" }}>(Correcte)</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default QuizViewer;
