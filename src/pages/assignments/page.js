import React, { useEffect, useState } from "react";
import "./assignments.css";

const Assignments = (props) => {
  //------------------------ states------------------------------------------------
  const []=useState();
  
  //------------------------- useEffect---------------------------------------------

 
    document.title = props.title;
  

  //------------------------- handlers---------------------------------------------
  

  //------------------------- components---------------------------------------------
  

  //------------------------- render---------------------------------------------
  return (
    <section className="Assignments" id="assignments">
      <div>
        <h1 className="title">Assignments</h1>
        <p className="description">
          On this page, you will find your Assignments, Quizzes, and your Homeworks. 
        </p>
      </div>
    </section>
  );
};
export default Assignments;
