import React, { useEffect, useState } from "react";
import "./dashboard.css";

const Dashboard = (props) => {
  //------------------------ states------------------------------------------------
  const []=useState();
  
  //------------------------- useEffect---------------------------------------------

 useEffect(()=>{document.title = props.title;},[props.title]);
    
  

  //------------------------- handlers---------------------------------------------
  

  //------------------------- components---------------------------------------------
  

  //------------------------- render---------------------------------------------
  return (
    <section className="dashboard" id="dashboard">
      <div>
        <h1 className="title">Dashboard</h1>
        <p className="description">
          On this page, you will meet an overview of your courses, assignments, grades, and every new announcement regarding the course you take. 
        </p>
      </div>
    </section>
  );
};
export default Dashboard;
