import React, { useEffect, useState } from "react";
import Quetion from "./Quetion";
import Answers from "./Answers";
import "./index.css";
import he from "he";
import Start from "./Start";
import Confetti from "react-confetti";

export default function App() {
  const [allmemes, setAllMemes] = useState([]);
  const [start, setstart] = useState(true);
  const [value, setValue] = useState([]);
  const [iswin, setIswin] = useState(false);
  const [score, setscore] = useState(0);
  const [isAnswersSubmitted, setIsAnswersSubmitted] = useState(false);
  const [reset, seReset] = useState(false);
  const [allanswers, setallanswers] = useState(false);
  const [hero, sethero] = useState(false);
  const [checkboxValues, setCheckboxValues] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = React.useState(
    {
      medium:false,
      easy:false,  
      hard: false, 
        lastName: false,
        email: false, 
        comments: false, 
        isFriendly: true
    }
)
  
  function Shuffle(Array) {
    return Array.sort(() => Math.random() - 0.5);
  }


useEffect(()=>{ formData.isFriendly|| formData.comments||formData.email||formData.firstName || formData.hard||formData.easy||formData.medium?fetchData():console.log("uu")},[formData])
  async function fetchData() {
    setIsLoading(true);
    setallanswers(false);
    setIsAnswersSubmitted(false);
    setscore(0);
    const AS = [22, 24, 25, 26];
    Shuffle(AS);
    const nm =formData.isFriendly? 9 : formData.comments?15:formData.email?17:formData.firstName?23:22
    const diffculty= formData.easy?"easy":formData.medium?"medium":formData.hard?"hard":"medium"
    const res = await fetch(
      `https://opentdb.com/api.php?amount=5&category=${nm}&difficulty=easy&type=multiple`
    );
    const data = await res.json();

    setAllMemes(data.results);
    setValue(
      data.results.map((x) => {
        const sc = x.incorrect_answers;
        sc.push(x.correct_answer);
        Shuffle(sc);
        return sc.map((c) => ({
          value: he.decode(c, {
            allowUnsafeSymbols: false,
            decimal: false,
            encodeEverything: false,
            useNamedReferences: true,
          }),
          isHeld: false,
          o: he.decode(x.question, { allowUnsafeSymbols: false }),
          correct: he.decode(x.correct_answer, { allowUnsafeSymbols: true }),
          isWin: false,
        }));
      })
    );
    setIsLoading(false);
  }

  useEffect(() => setstart(true), []);

  const QuetionComponent = value.map((questionOptions, index) => (
    <div key={index} className="con">
      <div className="hate">
        <Quetion question={questionOptions[0].o} />
      </div>
      <div className="love">
        {questionOptions.map((option, optionIndex) => (
          <Answers
            key={optionIndex}
            answer={option.value}
            isHeld={option.isHeld}
            click={() =>
              setAnswerHeld(
                questionOptions,
                option.value,
                option.isHeld,
                option.correct
              )
            }
            isWin={iswin}
            correct={option.correct}
            isAnswersSubmitted={isAnswersSubmitted}
          />
        ))}
      </div>
    </div>
  ));

  function setAnswerHeld(questionOptions, values, isHeld, correct) {
    const allQuestionsAnswered = value.every((questionOptions) =>
      questionOptions.some((option) => option.isHeld - 1)
    );

    if (allQuestionsAnswered) {
      setallanswers(false);
    }
    if (isAnswersSubmitted) {
      return;
    }

    function AP() {
      if (!isHeld && values === correct) {
        setscore((prev) => prev + 1);
      }
    }

    const updatedOptions = questionOptions.map((option) =>
      option.value === values
        ? { ...option, isHeld: true }
        : { ...option, isHeld: false }
    );
    setValue((prevValue) =>
      prevValue.map((options) =>
        options === questionOptions ? updatedOptions : options
      )
    );
    AP();
  }

  function setAnswersSubmitted() {
    if (iswin) {
fetchData()
      setIsAnswersSubmitted(false);
      setValue((prevValue) =>
        prevValue.map((questionOptions) =>
          questionOptions.map((option) => ({ ...option, isHeld: false }))
        )
      );
      setIswin(false);
    } else {
      const allQuestionsAnswered = value.every((questionOptions) =>
        questionOptions.some((option) => option.isHeld)
      );

      if (allQuestionsAnswered) {
        setIsAnswersSubmitted(true);
        setIswin(true);
        setallanswers(false);
      } else if (allQuestionsAnswered === false) {
        setallanswers(true);
      }
    }
  }

  
  function handleChange(event) {
    const { name, checked } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      isFriendly: name === "isFriendly" ? checked : false,
      comments: name === "comments" ? checked : false,
      email: name === "email" ? checked : false,
      lastName: name === "lastName" ? checked : false,
      easy: name === "easy" ? checked : false,
      medium: name === "medium" ? checked : false,
      hard: name === "hard" ? checked : false,
    }));
  }
  

    











const difficulty =<div >

  <form className="">
    

   <input 
            className="jk"
            type="checkbox" 
            id="east" 
            checked={formData.easy}
            onChange={handleChange}
            name="easy"
        />
              <label htmlFor="isFriendly" className="labe">easy</label>     
     <input 
            className="jk"
            type="checkbox" 
            id="medium" 
            checked={formData.medium}
            onChange={handleChange}
            name="medium"
        />
                <label htmlFor="comments" className="labe">medium </label>      
        <input 
            className="jk"
            type="checkbox" 
            id="hard" 
            checked={formData.hard}
            onChange={handleChange}
            name="hard"
        />
                   <label htmlFor="email" className="labe">hard</label>     
                  </form></div>
   
  


























const category=
<div  className="al">
  
<div className="category">
Questions category 
  </div >
  <form >
    <div className="K">
      


   <input 
             className="jk"
            type="checkbox" 
            id="isFriendly" 
            checked={formData.isFriendly}
            onChange={handleChange}
            name="isFriendly"
        />
              <label htmlFor="isFriendly" className="labe">genral</label>     
     <input 
            className="jk"
            type="checkbox" 
            id="comments" 
            checked={formData.comments}
            onChange={handleChange}
            name="comments"
        />
                <label htmlFor="comments"  className="labe"> games </label>      
        <input 
            className="jk"
            type="checkbox" 
            id="email" 
            checked={formData.email}
            onChange={handleChange}
            name="email"
        />
                   <label htmlFor="email" className="labe">sceince </label>     
            <input 
            className="jk"
            type="checkbox" 
            id="lastName"  
            checked={formData.lastName}
            onChange={handleChange}
            name="lastName"
        />
     <label htmlFor="lastname" className="labe">sports</label>        </div>  </form></div>
   
  






return (
    start == false 
    ? (
      
      
      <div className="all">
       
            <br />
        <div className="background">
          <svg
            className="circle"
            xmlns="http://www.w3.org/2000/svg"
            width="1000"
            height="1000"
            viewBox="0 0 148 118"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M-5.55191 4.90596C35.9614 1.77498 82.2425 -9.72149 112.306 19.1094C145.581 51.0203 155.282 102.703 142.701 147.081C130.767 189.18 93.7448 220.092 51.8208 232.476C16.5281 242.902 -15.4332 218.605 -49.1007 203.738C-85.3375 187.737 -133.641 182.993 -145.741 145.239C-158.358 105.868 -132.269 64.5881 -103.064 35.3528C-77.7328 9.99541 -41.2727 7.60006 -5.55191 4.90596Z"
              fill="#DEEBF8"
            />
          </svg>
          <div className="container" style={{ zIndex: 1 }}>
            {QuetionComponent}
          </div>
          <svg
            className="traingle"
            xmlns="http://www.w3.org/2000/svg"
            width="1300"
            height="1300"
            viewBox="0 0 126 131"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M63.4095 71.3947C35.1213 40.8508 -2.68211 11.7816 1.17274 -29.6933C5.43941 -75.599 39.854 -115.359 82.4191 -133.133C122.797 -149.994 170.035 -140.256 205.822 -115.149C235.947 -94.0141 236.823 -53.8756 246.141 -18.271C256.17 20.0508 282.521 60.8106 260.501 93.7792C237.538 128.159 188.991 133.432 147.931 128.768C112.318 124.723 87.7505 97.6768 63.4095 71.3947Z"
              fill="#FFFAD1"
            />
          </svg>
        </div>
        <div className="scoreAndButton">
          <div>
            {allanswers && (
              <div className="score">Please answer all the questions</div>
            )}
            {isAnswersSubmitted && (
              <div className="score">
                You scored {score}/5. Would you like to try again?
              </div>
            )}
            {score === 5 && <Confetti />}
          </div>
          <button onClick={setAnswersSubmitted} className="checkAnswer">
            {isLoading ? "Loading..." : (iswin ? "Try Again" : "Check Answer")}
          </button>
        </div>
      </div>
    ) : (

    
         <Start
         category={category}

         click={() => {

          setstart(false);
       
        }}
      /> 
    )
  );
}
