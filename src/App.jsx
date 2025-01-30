import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import QuizPage from "./pages/QuizPage";
import Home from "./pages/Home"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/quiz" element={<QuizPage />} /> 
      </Routes>
    </Router>
  );
}

export default App;
