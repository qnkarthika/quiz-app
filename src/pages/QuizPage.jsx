import React, { useState } from "react";
import Quiz from "../components/Quiz";
import Results from "../components/Results"; 

const QuizPage = () => {
  const [score, setScore] = useState(null);

  const handleFinish = (finalScore) => {
    setScore(finalScore); 
  };

  const handleRestart = () => {
    setScore(null); 
  };

  return (
    <div className="quiz-page">
      {score === null ? (
        <Quiz onFinish={handleFinish} />
      ) : (
        <Results score={score} total={10} onRestart={handleRestart} />
      )}
    </div>
  );
};

export default QuizPage;
