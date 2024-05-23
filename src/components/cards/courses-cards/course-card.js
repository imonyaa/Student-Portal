import React from "react";
import image1 from "../../../public/images/course0.png";
import "./course-card.css";

const CourseCard = ({
  image = "",
  title = "Card title",
  description = "Some quick example text to build on the card title and make up the bulk of the card's content.",
}) => {
  return (
    <div className="course-card">
      <img src={image} alt="course" className="course-image" />
      <div className="details">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>

      <button className="view-more">View More</button>
    </div>
  );
};

export default CourseCard;
