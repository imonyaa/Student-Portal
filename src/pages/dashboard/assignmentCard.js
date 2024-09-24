import React, { useState } from "react";
import video from "../../public/images/video.png";
import videoComplete from "../../public/images/video-complete.png";
import pdf from "../../public/images/pdf.png";
import assignment from "../../public/images/assignment.png.png";
import pdfComplete from "../../public/images/pdf-complete.png";
import Checkbox from "../../components/utils/checkbox";
import "../../components/cards/lecture-cards/lecture-card.css";
import { useSelector } from "react-redux";
import axios from "../../api/axios";
import DeletePopup from "../../components/utils/deletePopup";
import Cookies from "js-cookie";
import Button from "../../components/utils/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";

export const AssignmentCard = ({
  fileName,
  fileType,
  description,
  studentId,
  cardClickable = true,
  fileId,
  isDeletable,
  completionStatus,
  teacher,
  isAnnouncement,
  due_date,
  color,
  className = "",
  id,
  currentFile,
  created_at,
}) => {
  function formatTimestamp(timestamp) {
    if (!timestamp) {
      return "";
    }
    const date = new Date(timestamp);
    const now = new Date();

    const isToday = date.toDateString() === now.toDateString();

    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    const isYesterday = date.toDateString() === yesterday.toDateString();

    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    if (isToday) {
      return `Today at ${hours}:${minutes}`;
    } else if (isYesterday) {
      return `Yesterday at ${hours}:${minutes}`;
    } else {
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
      const year = date.getFullYear();

      return `${day}-${month}-${year} at ${hours}:${minutes}`;
    }
  }
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.userReducer);

  const myCompleted = false;
  const imageSource = () => {
    return assignment;
  };

  const [popup, setPopup] = useState(false);
  const accessToken = Cookies.get("accessToken");

  const handleDelete = async (
    accessToken,
    courseId,
    fileId,
    isAnnouncement
  ) => {
    try {
      let response = {};
      if (isAnnouncement) {
        response = await axios.delete(
          `https://student-portal-backend-0kg8.onrender.com/api/announcements/${fileId}`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
      } else {
        response = await axios.delete(
          `https://student-portal-backend-0kg8.onrender.com/api/courses/${courseId}/files/${fileId}`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
      }
      console.log(response.data);
      toast.success(
        `${isAnnouncement ? "Announcement" : "Lecture"} deleted successfully`,
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: 0,
          theme: "light",
        }
      );

      window.location.reload();
    } catch (error) {
      toast.error("An error happened please try again", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        theme: "light",
      });
      console.log(error);
    }
  };

  const handleClick = () => {
    navigate(`/courses/${id}/${fileId}`);
  };

  return (
    <div
      className={`${className} flex justify-between w-full p-3 border !border-palePurple bg-white !rounded-2xl pog  
      `}
    >
      <div className="flex justify-between w-full">
        <div className="flex items-center w-full">
          <img
            className={
              isAnnouncement ? "rounded-full w-12 h-12 object-cover" : "w-20 "
            }
            src={imageSource()}
            alt="Assignment"
          />
          <div className="ml-4 flex flex-col items-start ">
            <div className="flex flex-col gap-3 h-full ">
              <div className="h-full">
                <div className="flex items-baseline gap-3">
                  <h1
                    className={` font-outfit text-left ${
                      myCompleted
                        ? "font-medium text-gray-800"
                        : "font-semibold"
                    }`}
                  >
                    {fileName}
                  </h1>
                  <p className="text-gray-400 font-roboto font-medium text-[0.8rem] ">
                    {formatTimestamp(created_at)}
                  </p>
                </div>
                <p
                  className={` text-left font-roboto text-[0.9rem] ${
                    myCompleted ? " text-gray-800" : "text-black"
                  }`}
                >
                  {description}
                </p>
              </div>

              <div className="w-fit">
                <p
                  className={`${color} text-white font-roboto font-medium border rounded-full px-1 text-[0.8rem] `}
                >{`Due ${due_date} `}</p>
              </div>
            </div>
          </div>
        </div>

        <Button>Open</Button>
      </div>
    </div>
  );
};
