import React, { useState, useEffect } from 'react';
import '../styles.css';

const Quiz = () => {
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({}); 
  const [quizFinished, setQuizFinished] = useState(false); 
  const [score, setScore] = useState(0); 
  const [timeRemaining, setTimeRemaining] = useState(900); 

  // Fetch quiz data function
  const fetchQuizData = async () => {
    const apiUrl = "https://api.allorigins.win/raw?url=https://api.jsonserve.com/Uw5CrX";
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setQuizData(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
      console.error('Error fetching quiz data:', error);
    }
  };


  const handleAnswerChange = (questionId, optionId) => {
    setSelectedAnswers((prevState) => ({
      ...prevState,
      [questionId]: optionId,
    }));
  };

  
  const handleSubmit = () => {
    let totalScore = 0;

 
    quizData.questions.forEach((question) => {
      const selectedOptionId = selectedAnswers[question.id];
      const correctOption = question.options.find((option) => option.is_correct);

     
      if (selectedOptionId === correctOption.id) {
        totalScore += 1; 
      }
    });

    setScore(totalScore);
    setQuizFinished(true); 
  };

 
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(interval);
          handleSubmit(); 
          return 0; 
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval); 
  }, []);

  useEffect(() => {
    fetchQuizData();
  }, []);

  return (
    <div className="quiz-container">

      {loading && <p className="loading">Loading quiz data...</p>}
      {error && <p className="error">Error fetching quiz data: {error}</p>}
      {!quizFinished && quizData && !loading && !error && (
        <div>
          <h2>Quiz: {quizData.title}</h2>
          <p><strong>Topic:</strong> {quizData.topic}</p>
          <p><strong>Number of Questions:</strong> {quizData.questions_count}</p>
          <p><strong>Duration:</strong> {quizData.duration} minutes</p>
          <p><strong>Time Remaining:</strong> {Math.floor(timeRemaining / 60)}:{timeRemaining % 60}</p>

          <h3>Questions:</h3>
          <ul>
            {quizData.questions.map((question, index) => (
              <li key={question.id} className="question-item">
                <p><strong>{index + 1}. {question.description}</strong></p>
                <ul className="options">
                  {question.options.map((option) => (
                    <li key={option.id}>
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        value={option.description}
                        id={`option-${option.id}`}
                        onChange={() => handleAnswerChange(question.id, option.id)}
                      />
                      <label htmlFor={`option-${option.id}`}>
                        {option.description}
                      </label>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>

          <button onClick={handleSubmit}>Submit Quiz</button>
        </div>
      )}

      {quizFinished && (
        <div>
          <h2>Quiz Completed!</h2>
          <p>Your Total Score: {score} / {quizData.questions_count}</p>

          <h3>Correct Answers:</h3>
          <ul>
            {quizData.questions.map((question, index) => {
              const selectedOptionId = selectedAnswers[question.id];
              const correctOption = question.options.find((option) => option.is_correct);

              return (
                <li key={question.id} className="question-item">
                  <p><strong>{index + 1}. </strong><strong>{question.description}</strong></p>
                  <ul>
                    <li className="options-1">
                      <p>Your Answer: {question.options.find((option) => option.id === selectedOptionId)?.description}</p>
                    </li>
                    <li className="options-2">
                      <p>Correct Answer: {correctOption.description}</p>
                    </li>
                  </ul>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Quiz;
