import "../styles/QuizOptions.css";

function QuizOptions() {
  return (
    <div id="quizOptions">
      <button className="option firstOption" type="button">
        A : Option 1
      </button>
      <button className="option secondOption" type="button">
        B : Option 2
      </button>
      <button className="option thirdOption" type="button">
        C : Option 3
      </button>
      <button className="option forthOption" type="button">
        D : Option 4
      </button>
      {/* {console.info(quizData)} */}
    </div>
  );
}
export default QuizOptions;
