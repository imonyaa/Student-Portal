import React from "react";
import video from "../../../public/images/video.png";
import videoComplete from "../../../public/images/video-complete.png";
import pdf from "../../../public/images/pdf.png";
import pdfComplete from "../../../public/images/pdf-complete.png";
import Checkbox from "../../utils/checkbox";
import "./lecture-card.css";
import { useSelector } from "react-redux";

export const LectureCard = ({
  fileName,
  fileType,
  description,
  studentId,
  fileId,
  completionStatus,
  teacher,
  isAnnouncement,
}) => {
  const { user } = useSelector((state) => state.userReducer);
  const myStatus = completionStatus?.filter(
    (status) => studentId == status.student
  );
  const myCompleted = myStatus[0]?.completed;
  const imageSource = () => {
    if (isAnnouncement) {
      return teacher.profileImage;
    } else if (fileType === "application/pdf") {
      return myCompleted ? pdfComplete : pdf;
    } else {
      return myCompleted ? videoComplete : video;
    }
  };

  return (
    <button className="  flex justify-between w-[90%] p-3 border !border-palePurple !rounded-2xl pog">
      <div className="flex items-center">
        <img
          className={
            isAnnouncement ? "rounded-full w-12 h-12 object-cover" : "w-20 "
          }
          src={imageSource()}
          alt="lecture"
        />
        <div className="ml-4 flex flex-col items-start">
          <h1
            className={` font-outfit ${
              myCompleted ? "font-medium text-gray-800" : "font-semibold"
            }`}
          >
            {fileName}
          </h1>
          <p
            className={` text-left font-roboto text-[0.9rem] ${
              myCompleted ? " text-gray-800" : "text-black"
            }`}
          >
            {description}
          </p>
        </div>
      </div>
      {user.role == "student" && !isAnnouncement && (
        <div className="flex items-center m-5">
          <Checkbox checked={myCompleted} disabled />
        </div>
      )}
    </button>
  );
};
