import React from "react";
import image1 from "../../../public/images/noback.png";
import "./course-card.css";
import Button from "../../utils/button";
import { useNavigate } from "react-router-dom";
import { getCourseColor } from "../../../utils/utils";

const CourseCard = ({ title, description, id }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/courses/${id}`);
  };
  return (
    <div className="course-card">
      <img
        src={image1}
        alt="course"
        className={`course-image ${getCourseColor(title)}
        `}
      />
      <div className="details">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>

      <Button onClick={handleClick}>View More</Button>
    </div>
  );
};

export default CourseCard;
