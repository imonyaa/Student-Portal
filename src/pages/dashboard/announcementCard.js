import React, { useState } from "react";
import video from "../../public/images/video.png";
import videoComplete from "../../public/images/video-complete.png";
import pdf from "../../public/images/pdf.png";
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

export const AnnouncementCard = ({
  fileName,
  fileType,
  description,
  studentId,
  cardClickable = false,
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

  const myCompleted = false;
  const imageSource = () => {
    return teacher?.profileImage;
  };

  return (
    <div
      className={`${className} flex justify-between w-full p-3 border !border-palePurple bg-white !rounded-2xl pog  ${
        cardClickable ? "cursor-pointer hover:bg-mostSoftPurple" : ""
      } ${currentFile == fileId ? "!bg-softPurple" : ""} `}
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

      {isAnnouncement && (
        <Button
          className={"w-[108px]"}
          type="button"
          onClick={() => {
            navigate(`/courses/${id}`);
          }}
        >
          Open course
        </Button>
      )}
    </div>
  );
};
