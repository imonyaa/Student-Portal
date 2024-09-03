import React, { useEffect, useState } from "react";
import Button from "../../../../components/utils/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import "../../../../App.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Tabs from "../../../../components/tabs/tabs";
import { LectureCard } from "../../../../components/cards/lecture-cards/lecture-card";
import { useSelector } from "react-redux";
import MaterialPopup from "../add-course-material/material-popup";

const EditCourseMaterials = ({
  title,
  description,
  id,
  course,
  files,
  announcements,
}) => {
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    console.log(course);
  }, [course]);
  const { user } = useSelector((state) => state.userReducer);

  const sortedFiles = files.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  const sortedAnnouncements = announcements.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );
  const sortedassignments = [];

  console.log(sortedFiles);
  console.log(sortedAnnouncements);

  const [activeTab, setActiveTab] = useState("lectures");

  const [popup, setPopup] = useState(false);

  return (
    <div className="flex flex-col py-5 w-full  ">
      <div className="flex w-full justify-between items-center px-10">
        <h1 className="title !font-normal !text-[20px] ">Course materials</h1>
        <Button
          onClick={() => {
            setPopup(true);
          }}
        >
          Add material
          <Icon icon="bx:bx-plus" className="ml-3" />
        </Button>
      </div>{" "}
      <div className="flex flex-col gap-10">
        <Tabs
          onTabChange={setActiveTab}
          selectedIndex={activeTab}
          tabs={[
            {
              label: "Lectures",
              value: "lectures",
            },
            {
              label: "Announcements",
              value: "announcements",
            },
            {
              label: "Assignments",
              value: "assignments",
            },
          ]}
        />

        {activeTab === "lectures" && (
          <div className="flex flex-col gap-5 px-20">
            {sortedFiles.length > 0 ? (
              sortedFiles?.map((file) => (
                <LectureCard
                  cardClickable={false}
                  fileName={
                    file?.lectureName ||
                    course.teacher.firstName + " " + course.teacher.lastName
                  }
                  isDeletable={true}
                  className="!w-[100%] "
                  fileType={file.fileType}
                  description={file.description || file.content}
                  completionStatus={file.completionStatus || []}
                  studentId={user.id}
                  fileId={file._id}
                  teacher={course.teacher}
                  isAnnouncement={file?.title?.length > 0 ? true : false}
                  id={course._id}
                />
              ))
            ) : (
              <p className="!text-black !text-center w-full !text-[20px] py-20 ">
                No Lectures
              </p>
            )}
          </div>
        )}
        {activeTab === "announcements" && (
          <div className="flex flex-col gap-5 px-20">
            {sortedAnnouncements.length > 0 ? (
              sortedAnnouncements?.map((file) => (
                <LectureCard
                  cardClickable={false}
                  fileName={
                    file?.lectureName ||
                    course.teacher.firstName + " " + course.teacher.lastName
                  }
                  isDeletable={true}
                  fileType={file.fileType}
                  description={file.description || file.content}
                  completionStatus={file.completionStatus || []}
                  studentId={user.id}
                  fileId={file._id}
                  teacher={course.teacher}
                  isAnnouncement={file?.title?.length > 0 ? true : false}
                  id={course?._id}
                  created_at={file?.created_at}
                />
              ))
            ) : (
              <p className="!text-black !text-center w-full !text-[20px] py-20 ">
                No announcements
              </p>
            )}
          </div>
        )}
        {activeTab === "assignments" && (
          <div className="flex flex-col gap-5 px-20">
            {sortedassignments.length > 0 ? null : (
              <p className="!text-black !text-center w-full !text-[20px] py-20 ">
                No assignments
              </p>
            )}
          </div>
        )}
      </div>
      <MaterialPopup trigger={popup} setTrigger={setPopup} courseId={id} />
    </div>
  );
};

export default EditCourseMaterials;
