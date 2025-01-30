import React from "react";
import PropTypes from "prop-types";

const Results = ({ score, total, onRestart }) => {
  return (
    <div>
      <h1>Quiz Results</h1>
      <p>
        Your score: {score} out of {total}
      </p>
      <button onClick={onRestart}>Restart Quiz</button>
    </div>
  );
};

Results.propTypes = {
  score: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  onRestart: PropTypes.func.isRequired,
};

export default Results;
