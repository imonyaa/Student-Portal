import React, { useState } from "react";
import video from "../../../public/images/video.png";
import videoComplete from "../../../public/images/video-complete.png";
import pdf from "../../../public/images/pdf.png";
import pdfComplete from "../../../public/images/pdf-complete.png";
import Checkbox from "../../utils/checkbox";
import "./lecture-card.css";
import { useSelector } from "react-redux";
import axios from "../../../api/axios";
import DeletePopup from "../../utils/deletePopup";
import Cookies from "js-cookie";
import Button from "../../utils/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";

export const LectureCard = ({
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
  const myStatus = completionStatus?.filter(
    (status) => studentId == status.student
  );
  const myCompleted = myStatus[0]?.completed || false;
  const imageSource = () => {
    if (isAnnouncement) {
      return teacher.profileImage;
    } else if (fileType === "application/pdf") {
      return myCompleted ? pdfComplete : pdf;
    } else {
      return myCompleted ? videoComplete : video;
    }
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
          `http://localhost:3500/api/announcements/${fileId}`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
      } else {
        response = await axios.delete(
          `http://localhost:3500/api/courses/${courseId}/files/${fileId}`,
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
    if (isAnnouncement || !cardClickable) {
      return;
    } else {
      navigate(`/courses/${id}/${fileId}`);
    }
  };

  return (
    <div
      className={`${className} flex justify-between w-full p-3 border !border-palePurple bg-white !rounded-2xl pog  ${
        cardClickable ? "cursor-pointer hover:bg-mostSoftPurple" : ""
      } ${currentFile == fileId ? "!bg-softPurple" : ""} `}
      onClick={handleClick}
    >
      <div className="flex items-center w-full">
        <img
          className={
            isAnnouncement ? "rounded-full w-12 h-12 object-cover" : "w-20 "
          }
          src={imageSource()}
          alt="lecture"
        />
        <div className="ml-4 flex flex-col items-start ">
          <div className="flex items-baseline gap-3">
            <h1
              className={` font-outfit text-left ${
                myCompleted ? "font-medium text-gray-800" : "font-semibold"
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
      </div>
      {user.role == "student" && !isAnnouncement && (
        <div className="flex items-center m-5">
          <Checkbox
            disabled
            checked={myCompleted}
            onClick={(e) => {
              e.stopPropagation();
            }}
          />
        </div>
      )}
      {isDeletable && (
        <Button
          type="button"
          className="!bg-[#fa6363] text-white hover:!bg-red-500 focus:!outline-red-600 ml-10"
          onClick={() => {
            setPopup(true);
          }}
        >
          Delete
          <Icon icon="majesticons:delete-bin-line" className="ml-3 " />
        </Button>
      )}

      <DeletePopup
        trigger={popup}
        onDelete={() => handleDelete(accessToken, id, fileId, isAnnouncement)}
        itemToBeDeleted={fileName}
        setTrigger={setPopup}
      />
      <Toaster
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        richColors
      />
    </div>
  );
};
