import "../styles/ButtonStartQuiz.css";

// eslint-disable-next-line react/prop-types
function ButtonStartQuiz({ handleStartQuiz }) {
  return (
    <div id="buttonStart">
      <button id="buttonStartQuiz" type="button" onClick={handleStartQuiz}>
        Start Quiz
      </button>
    </div>
  );
}

export default ButtonStartQuiz;
