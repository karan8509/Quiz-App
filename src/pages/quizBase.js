import React, { useState, useEffect } from "react";
import { quizQuestions } from "../api/quizQuestions.js";
import "bootstrap/dist/css/bootstrap.css";
import "../style/quizBase.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const QuizBase = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isQuizFinal, setIsQuizFinal] = useState(false);
  const [selectedOption, setSelectedOption] = useState();
  const [time, setTime] = useState(30);


  useEffect(() => {
            setTime(30);
            const setTimerunning = setInterval(() => {
                 setTime((prev) => prev - 1);
            }, 1000);
            const newTime = setTimeout(() => {
                newCallOption()
            }, 30000);
            return () => {
              clearInterval(setTimerunning)
              clearTimeout(newTime)
            }
  }, [currentIndex])

  const newCallOption = () => {
     const newItem = currentIndex + 1
     if(newItem <  quizQuestions.length){
      setCurrentIndex(newItem)
     }else{
      setScore(true)
     }
  }

  const handleClick = (SelectionOption) => {
    if (SelectionOption === quizQuestions[currentIndex].correctAnswer) {
      setScore(score + 1);
      toast.success("Correct Answer!", { autoClose: 1500 });
    } else if (SelectionOption !== "") {
      toast.error("Wrong Answer!", { autoClose: 1500 });
    }

    newCallOption()
  };

  return (
    <>
      {isQuizFinal ? (
        <div className="quit-result">
          <h1>{`Total Questions: ${quizQuestions.length}`}</h1>
          <h2>Final Score: {score}</h2>
        </div>
      ) : (
        <center className="container">
          <div className="row">
            <h3>Quiz App</h3>
            <div className="col-sm-12">
              <h4>
                Question {currentIndex + 1}: {quizQuestions[currentIndex].question} 
              </h4>
              <p>Time: {time} s</p>
            </div>
          </div>
          <div className="list-group">
            {quizQuestions[currentIndex].options.map((_element, _index) => (      // option print 
              <label className="list-group-item" key={_index}>
                <input
                  className="form-check-input me-1"
                  type="radio"
                  id="option"
                  checked={selectedOption === _element}
                  name="option"
                  onChange={() => handleClick(_element)}
                />
                {_element}
              </label>
            ))}
          </div>
        </center>
      )}
    </>
  );
};

export default QuizBase;

