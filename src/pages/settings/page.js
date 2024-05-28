import React, { useEffect, useState } from "react";
import "./settings.css";

const Settings = (props) => {
  //------------------------ states------------------------------------------------
  const []=useState();
  
  //------------------------- useEffect---------------------------------------------

 
  useEffect(()=>{document.title = props.title;},[props.title]);
  

  //------------------------- handlers---------------------------------------------
  

  //------------------------- components---------------------------------------------
  

  //------------------------- render---------------------------------------------
  return (
    <section className="settings" id="settings">
      <div>
        <h1 className="title">Settings</h1>
        <p className="description">
          On this page, you can edit your profile adn control the settings to your preference.
        </p>
      </div>
    </section>
  );
};
export default Settings;
