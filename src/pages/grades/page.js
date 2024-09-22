import React, { useEffect, useState } from "react";
import "./grades.css";

const Grades = (props) => {
  //------------------------ states------------------------------------------------
  const []=useState();
  
  //------------------------- useEffect---------------------------------------------

 
  useEffect(()=>{document.title = props.title;},[props.title]);
  

  //------------------------- handlers---------------------------------------------
  

  //------------------------- components---------------------------------------------
  

  //------------------------- render---------------------------------------------
  return (
    <section className="grades" id="grades">
      <div>
        <h1 className="title">Grades</h1>
        <p className="description">
          On this page, you will view the marks of your exams and quizzes you took throughout the academic year.
        </p>
      </div>
    </section>
  );
};
export default Grades;
