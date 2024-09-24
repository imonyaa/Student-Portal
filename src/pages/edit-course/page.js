import React, { useState } from "react";
import Button from "../../components/utils/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import Cookies from "js-cookie";

import { useEffect } from "react";
import EditCourseDetails from "./components/edit-course-details/edit-course-details";
import { useParams } from "react-router-dom";
import axios from "../../api/axios";
import EditCourseMaterials from "./components/edit-course-materials/edit-course-materials";
const EditCourse = (props) => {
  useEffect(() => {
    document.title = props.title;
  }, [props.title]);
  const { id } = useParams();
  const accessToken = Cookies.get("accessToken");

  const [course, setCourse] = useState({});
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const fetchCourseDetail = async (accessToken, url, setter) => {
      try {
        if (accessToken) {
          const response = await axios.get(url, {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          setter(response.data);
          console.log(response.data);
        }
      } catch (error) {
        console.log(error);
        setter([]);
      }
    };

    fetchCourseDetail(
      accessToken,
      "https://student-portal-backend-0kg8.onrender.com/api/courses/" + id,
      setCourse
    );
    // fetchCourseDetail(
    //   accessToken,
    //   "https://student-portal-backend-0kg8.onrender.com/api/courses/" + id + "/students",
    //   setStudents
    // );
    fetchCourseDetail(
      accessToken,
      "https://student-portal-backend-0kg8.onrender.com/api/announcements/courses/" +
        id +
        "/announcements",
      setAnnouncements
    );
  }, []);

  const files = (course?.files ? [...course.files] : []).concat(
    announcements ? [...announcements] : []
  );

  return (
    <div className="h-full w-full">
      <div className=" h-full w-full  grid grid-cols-[0fr,1fr]">
        <div className="">
          <Button
            className="!rounded-full px-3 py-4 "
            onClick={() => window.history.back()}
          >
            <Icon icon="ion:chevron-back-outline" className="text-[20px]" />
          </Button>
        </div>
        <div className="w-full h-full flex flex-col gap-4 px-9 py-4">
          <h1 className="title">Edit course</h1>
          <EditCourseDetails course={course} id={id} />
          <EditCourseMaterials
            course={course}
            files={[...(course.files ? [...course.files] : [])]}
            announcements={announcements}
            id={id}
          />
        </div>
      </div>
    </div>
  );
};

export default EditCourse;
