import React, { useEffect, useState } from "react";
import "./dashboard.css";
import { useParams, useNavigate } from "react-router-dom";

import Button from "../../components/utils/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import axios from "../../api/axios";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import image1 from "../../public/images/noback.png";
import { LectureCard } from "./lectureCard";
import { AssignmentCard } from "./assignmentCard";
import { AnnouncementCard } from "./announcementCard";

const Dashboard = (props) => {
  //------------------------ states-------------------------------------------------
  const { role } = useSelector((state) => state.userReducer.user);
  const { user } = useSelector((state) => state.userReducer);
  const [courses, setCourses] = useState([]);
  const [lectures, setLectures] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [courseIDs, setCourseIDs] = useState([]);

  const navigate = useNavigate();
  const accessToken = Cookies.get("accessToken");
  //------------------------- useEffect---------------------------------------------

  useEffect(() => {
    document.title = props.title;
  }, [props.title]);

  useEffect(() => {
    fetchCourses(accessToken);
    const allLectures = courses.flatMap((course) =>
      course.files.map((file) => ({
        lectureName: file.lectureName,
        filename: file.filename,
        fileType: file.fileType,
        description: file.description,
        _id: file._id,
        id: course._id,
        created_at: file.created_at,
        completionStatus: file.completionStatus,
      }))
    );

    setLectures(allLectures);
    console.log(`lectures are heeeeeeeeeeeere`, lectures);
    courses.forEach((element) => {
      fetchAnnouncements(element._id, accessToken);
      console.log(`announcements are heeeeeeeeeeeere`, announcements);
    });
  }, []);
  // Extract lectures from each course and flatten the array
  useEffect(() => {
    const allLectures = courses.flatMap((course) =>
      course.files.map((file) => ({
        lectureName: file.lectureName,
        filename: file.filename,
        fileType: file.fileType,
        description: file.description,
        _id: file._id,
        id: course._id,
        created_at: file.created_at,
        completionStatus: file.completionStatus,
      }))
    );
    courses.forEach((element) => {
      fetchAnnouncements(element._id, accessToken);
      console.log(`announcements are heeeeeeeeeeeere`, announcements);
    });
    setLectures(allLectures);
    console.log(`lectures are heeeeeeeeeeeere`, lectures);
  }, [courses]);

  //------------------------- fetches-----------------------------------------

  const fetchCourses = async (accessToken) => {
    try {
      if (accessToken) {
        const response = await axios.get(
          "https://student-portal-backend-0kg8.onrender.com/api/courses",
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        setCourses(response.data);
      }
    } catch (error) {
      console.log(error);
      setCourses([]);
    }
  };

  const fetchAnnouncements = async (id, accessToken) => {
    try {
      if (accessToken) {
        const response = await axios.get(
          "https://student-portal-backend-0kg8.onrender.com/api/announcements/courses/" +
            id +
            "/announcements",
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        setAnnouncements(...announcements, response.data);
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
      setAnnouncements([]);
    }
  };
  //------------------------- handlers and statements--------------------------------
  const sortedLectures = lectures
    ? lectures.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    : [];
  const sortedAnnouncements = announcements
    ? announcements?.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      )
    : [];
  //------------------------- render-------------------------------------------------
  return (
    <section className="dashboard w-full flex flex-col gap-10" id="dashboard">
      <div className="w-full">
        <h1 className="title">Dashboard</h1>
        <p className="description">
          On this page, you will meet an overview of your courses, assignments,
          grades, and every new announcement regarding the course you take.
        </p>
      </div>
      <div className="flex flex-col w-full gap-10 ">
        <div className=" flex flex-col gap-2 w-full">
          <div className=" flex w-full justify-between">
            <h1 className="title !text-[20px]">New Lectures</h1>
            <button
              type="button"
              className="text-darkPurple"
              onClick={() => navigate("/courses")}
            >
              <u>View more</u>
            </button>
          </div>
          <div className="flex gap-4">
            {sortedLectures?.slice(0, 3).map((file) => (
              <LectureCard
                className="w-1/3"
                cardClickable={file?.title?.length > 0 ? false : true}
                fileName={file?.lectureName}
                fileType={file?.fileType}
                description={file?.description}
                studentId={user?.id}
                id={file?.id}
                fileId={file?._id}
                isAnnouncement={false}
                created_at={file?.created_at}
              />
            ))}
          </div>
        </div>
        <div className=" grid grid-cols-2 gap-10 ">
          <div className=" flex flex-col gap-2 w-full">
            <div className="flex w-full justify-between ">
              <h1 className="title !text-[20px]">Assignments</h1>
              <button
                type="button"
                className="text-darkPurple pr-4"
                onClick={() => navigate("/assignments")}
              >
                <u>View more</u>
              </button>
            </div>
            <div className="flex flex-col  gap-4 min-h-[22rem] h-[22rem] pr-4 overflow-auto">
              <AssignmentCard
                cardClickable={true}
                fileName="Assignment 1"
                fileType={"video/mp4"}
                description={
                  "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor."
                }
                completionStatus={[]}
                studentId={user?.id || "null"}
                fileId={"null"}
                teacher={"null"}
                isAnnouncement={false}
                due_date={"yesterday"}
                color={"bg-red-500"}
                id={"null"}
                created_at={new Date("2024-09-19T15:18:33.435+00:00")}
              />
              <AssignmentCard
                cardClickable={true}
                fileName="Assignment 2"
                fileType={"video/mp4"}
                description={
                  "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor."
                }
                completionStatus={[]}
                studentId={user?.id || "null"}
                fileId={"null"}
                teacher={"null"}
                isAnnouncement={false}
                id={"null"}
                due_date={"tomorrow"}
                color={"bg-green-500"}
                created_at={new Date("2024-09-19T15:18:33.435+00:00")}
              />
              <AssignmentCard
                cardClickable={true}
                fileName="Assignment 3"
                fileType={"video/mp4"}
                description={
                  "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor."
                }
                completionStatus={[]}
                studentId={user?.id || "null"}
                fileId={"null"}
                teacher={"null"}
                isAnnouncement={false}
                color={"bg-green-500"}
                due_date={"the 27th Apr, 2025"}
                id={"null"}
                created_at={new Date("2024-09-19T15:18:33.435+00:00")}
              />
            </div>
          </div>

          <div className="w-full flex flex-col gap-2">
            <div className=" flex w-full justify-between ">
              <h1 className="title !text-[20px]">New Announcements</h1>
              <button
                type="button"
                className="text-darkPurple pr-4"
                onClick={() => navigate("/courses")}
              >
                {" "}
                <u>View more</u>
              </button>
            </div>
            <div className="flex flex-col gap-4 min-h-[22rem] h-[22rem]  pr-4 overflow-auto">
              {sortedAnnouncements?.map((file) => (
                <AnnouncementCard
                  cardClickable={file?.title?.length > 0 ? false : true}
                  fileName={
                    file?.teacher?.firstName + " " + file?.teacher?.lastName
                  }
                  fileType={file?.fileType}
                  description={file?.content}
                  teacher={file?.teacher}
                  studentId={user?.id}
                  id={file?.courses[0]}
                  fileId={file?._id}
                  isAnnouncement={true}
                  created_at={file?.created_at}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="w-full ">
          <h1 className="title !text-[20px]">Grades</h1>
        </div>
      </div>
    </section>
  );
};
export default Dashboard;
