import React from "react";
import  { useMemo } from "react";
import './index.css';

 function  Answers(props){


    const styles =  useMemo(() => { return{
        backgroundColor:   props.isWin==true &props.isHeld==true &props.correct==props.answer?"#94D7A2":props.isWin&&props.isHeld&&props.correct!=props.answer?
        "#F8BCBC":props.isHeld?"#D6DBF5":props.isHeld==false &props.isWin==true&props.answer==props.correct?"#94C7A2":"white"
        
        ,opacity:props.isWin&&props.isHeld&&props.correct!=props.answer?
        "90%":props.isHeld==false &props.isWin==true&props.answer==props.correct?"40%":"100%"}})
        
          
    
    return <div className="ans">
        
  <nav className="answer-main"  style={styles} onClick={props.click}>
    

<div className="answer" style={{opacity:"100%"} }>
    {props.answer}
</div> </nav>  </div> 
}
export default React.memo(Answers)