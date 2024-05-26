import React, { useEffect, useState } from "react";
import "./calendar.css";

const Calendar = (props) => {
  //------------------------ states------------------------------------------------
  const []=useState();
  
  //------------------------- useEffect---------------------------------------------

 
    document.title = props.title;
  

  //------------------------- handlers---------------------------------------------
  

  //------------------------- components---------------------------------------------
  

  //------------------------- render---------------------------------------------
  return (
    <section className="Calendar" id="calendar">
      <div>
        <h1 className="title">Calendar</h1>
        <p className="description">
          On this page, you will find a Calendar for your Courses, Assignments submission due dates, as well as your Exams schedule.
        </p>
      </div>
    </section>
  );
};
export default Dashboard;
