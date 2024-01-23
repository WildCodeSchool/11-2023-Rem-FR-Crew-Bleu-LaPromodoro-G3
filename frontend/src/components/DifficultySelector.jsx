import React from "react";
import PropTypes from "prop-types";
import "../styles/DifficultySelector.css";

function DifficultySelector({ selectedDifficulty, onChangeDifficulty }) {
  const difficultyOptions = ["easy", "medium", "hard"];

  return (
    <div className="difficultySection">
      <p>Choisissez la difficulté :</p>

      <div id="difficultContainer">
        {difficultyOptions.map((difficulty) => (
          // eslint-disable-next-line jsx-a11y/label-has-associated-control
          <label
            htmlFor={`difficulty-${difficulty}`}
            key={difficulty}
            className="radioLabel"
          >
            <input
              type="radio"
              value={difficulty}
              checked={selectedDifficulty === difficulty}
              onChange={() => onChangeDifficulty(difficulty)}
              className="difficultSelect"
              id={`difficulty-${difficulty}`}
            />
            <div className="btn">
              <span className="span">{difficulty}</span>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}

DifficultySelector.propTypes = {
  selectedDifficulty: PropTypes.string.isRequired,
  onChangeDifficulty: PropTypes.func.isRequired,
};

export default DifficultySelector;
