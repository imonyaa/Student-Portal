import React, { useEffect, useState } from "react";
import "./courses.css";
import CourseCard from "../../components/cards/courses-cards/course-card";
import axios from "../../api/axios";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import Button from "../../components/utils/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useNavigate } from "react-router-dom";
import CreateCoursePopup from "./course-popup.js";

const Courses = (props) => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [popup, setPopup] = useState(false);

  useEffect(() => {
    document.title = props.title;
  }, [props.title]);

  const { role } = useSelector((state) => state.userReducer.user);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const accessToken = Cookies.get("accessToken");
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

    fetchCourses();
  }, []);

  const createCourse = () => {
    navigate("/courses/create-course");
  };

  return (
    <section className="courses w-full" id="courses">
      <div className="w-full">
        <h1 className="title">Courses</h1>
        <div className="flex justify-between gap-10 items-center w-full">
          <p className="description">
            On this page, you will discover an extensive collection of all the
            courses you've enrolled in, offering a comprehensive overview of
            your academic or professional journey.
          </p>
          {role == "teacher" ? (
            <Button
              className="!w-28"
              type="button"
              onClick={() => {
                setPopup(true);
              }}
            >
              Add Course <Icon icon="mingcute:add-fill" className="ml-3" />
            </Button>
          ) : null}
        </div>
      </div>
      <div className="courses-grid">
        {courses.length > 0 ? (
          courses.map((item, index) => (
            <CourseCard
              key={index}
              description={item.description}
              title={item.title}
              id={item._id}
            />
          ))
        ) : (
          <p></p>
        )}
      </div>
      <CreateCoursePopup trigger={popup} setTrigger={setPopup} />
    </section>
  );
};

export default Courses;
