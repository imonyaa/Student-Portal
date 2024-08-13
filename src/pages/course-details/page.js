import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Button from "../../components/utils/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import axios from "../../api/axios";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { setUser } from "../../state/user/userSlice";
import { getCourseColor } from "../../utils/utils";
import image1 from "../../public/images/noback.png";
import { LectureCard } from "../../components/cards/lecture-cards/lecture-card";

const { useState } = require("react");

const CourseDetails = (props) => {
  //get the user info from the redux
  const { user } = useSelector((state) => state.userReducer);
  const { id } = useParams();
  const [course, setCourse] = useState({});
  const [students, setStudents] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  useEffect(() => {
    document.title = props.title;
  }, [props.title]);
  useEffect(() => {
    const accessToken = Cookies.get("accessToken");

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
    //http://localhost:3500/api/announcements/courses/66aa245404620304c86dc6a7/announcements

    fetchCourseDetail(
      accessToken,
      "http://localhost:3500/api/courses/" + id,
      setCourse
    );
    fetchCourseDetail(
      accessToken,
      "http://localhost:3500/api/courses/" + id + "/students",
      setStudents
    );
    fetchCourseDetail(
      accessToken,
      "http://localhost:3500/api/announcements/courses/" +
        id +
        "/announcements",
      setAnnouncements
    );
  }, []);
  const files = (course?.files ? [...course.files] : []).concat(
    announcements ? [...announcements] : []
  );
  const sortedFiles = files
    ? [...files].sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    : [];

  return (
    <div className="w-full h-full grid grid-cols-[0fr,1fr,0.3fr]">
      <div>
        <Button
          className="rounded-full px-3 py-4 "
          onClick={() => window.history.back()}
        >
          <Icon icon="ion:chevron-back-outline" className="text-[20px]" />
        </Button>
      </div>
      <div className="">
        <h1 className="title !text-[28px] my-4 ml-9">{course.title}</h1>
        <div className="flex flex-col items-center p-4 w-[90%] h-full mx-auto gap-4  overflow-hidden">
          {sortedFiles?.map((file) => (
            <LectureCard
              fileName={
                file.fileName ||
                course.teacher.firstName + " " + course.teacher.lastName
              }
              fileType={file.fileType}
              description={file.description || file.content}
              completionStatus={file.completionStatus || []}
              studentId={user.id}
              fileId={file.id}
              teacher={course.teacher}
              isAnnouncement={file?.title?.length > 0 ? true : false}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center p-4 w-full h-full mx-auto border border-palePurple bg-softPurple rounded-[3rem] overflow-hidden">
        <div className="flex flex-col items-center mt-2">
          {course.title && (
            <img
              src={image1}
              alt="course"
              className={`fit-cover w-[80%] rounded-[2rem] m-1 mt-3 ${getCourseColor(
                course.title
              )}
        `}
            />
          )}
          <h1 className="title !text-[20px] !text-center ">{course.title}</h1>
          <p className="text-[14px]">{course.description}</p>
        </div>
        <div className="flex flex-col items-center m-4">
          <h1 className="title !text-[20px]">Teacher</h1>
          <div className="flex items-center ">
            {course.teacher && (
              <img
                src={course.teacher.profileImage}
                alt="teacher"
                className="h-10 w-10 mr-3 object-cover rounded-full"
              />
            )}
            <p className="font-medium text-left">
              {course.teacher?.firstName} {course.teacher?.lastName}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center m-4">
          <h1 className="title !text-[20px]">Students</h1>
          <div className="flex flex-col gap-2 ">
            {students.map((student) => (
              <div className="flex items-center w-full ">
                <img
                  src={student.profileImage}
                  alt="student"
                  className="h-10 w-10 mr-3 object-cover rounded-full"
                />

                <p className="font-medium text-left">
                  {student.firstName} {student.lastName}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
