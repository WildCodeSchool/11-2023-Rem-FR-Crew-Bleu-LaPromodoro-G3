import "../styles/ButtonNext.css";

// eslint-disable-next-line react/prop-types
function ButtonNext({ onClick }) {
  return (
    <div id="buttonNext">
      <button id="buttonNextQuestion" type="button" onClick={onClick}>
        Question suivante
      </button>
    </div>
  );
}

export default ButtonNext;
