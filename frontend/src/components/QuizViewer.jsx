/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
import React from "react";
import "../styles/QuizViewer.css";

function QuizViewer({ questions }) {
  return (
    <div>
      <div className="inventoryCreation" />
      <div className="viewListing">
        {questions && questions.length > 0 ? (
          <ul id="listingQuestion">
            {questions.map((question, index) => (
              <div key={index}>
                <h4>Question: {question.question}</h4>
                <ul>
                  {question.options.map((option, optionIndex) => (
                    <li key={optionIndex}>
                      Réponse: {option.text}
                      {option.correct_option && (
                        <span style={{ color: "green" }}>(Correcte)</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </ul>
        ) : (
          <p>Aucune question n'a été ajoutée.</p>
        )}
      </div>
    </div>
  );
}

export default QuizViewer;
