import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "../../components/utils/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import axios from "../../api/axios";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { getCourseColor } from "../../utils/utils";
import image1 from "../../public/images/noback.png";
import { LectureCard } from "../../components/cards/lecture-cards/lecture-card";
import DeletePopup from "../../components/utils/deletePopup";

const CourseDetails = (props) => {
  //get the user info from the redux
  const { user } = useSelector((state) => state.userReducer);
  const { id } = useParams();
  const [course, setCourse] = useState({});
  const [students, setStudents] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [popup, setPopup] = useState(false);
  useEffect(() => {
    document.title = props.title;
  }, [props.title]);
  const accessToken = Cookies.get("accessToken");
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
  const navigate = useNavigate();
  const handleDelete = async (accessToken, courseId) => {
    try {
      if (accessToken && courseId) {
        const response = await axios.delete(
          `http://localhost:3500/api/courses/${courseId}`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );

        console.log(response.data);
        navigate("/courses");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-full">
      <div className="w-full h-full grid grid-cols-[0fr,1fr,0.3fr]">
        <div>
          <Button
            className="!rounded-full px-3 py-4 "
            onClick={() => window.history.back()}
          >
            <Icon icon="ion:chevron-back-outline" className="text-[20px]" />
          </Button>
        </div>
        <div className="">
          <div className="flex justify-between items-baseline">
            <h1 className="title !text-[28px] my-4 ml-9">{course.title}</h1>
            <div className="flex  gap-4 items-center justify-end mr-10">
              {user.role == "teacher" ? (
                <Button
                  type="button"
                  className=""
                  onClick={() => {
                    navigate("/courses/" + id + "/edit-course");
                  }}
                >
                  Edit Course
                  <Icon icon="fluent:edit-32-filled" className="ml-3" />
                </Button>
              ) : null}
              {user.role == "teacher" ? (
                <Button
                  type="button"
                  className="!bg-[#fa6363] text-white hover:!bg-red-500 focus:!outline-red-600"
                  onClick={() => setPopup(true)}
                >
                  Delete
                  <Icon icon="majesticons:delete-bin" className="ml-3 " />
                </Button>
              ) : null}
            </div>
          </div>

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
                fileId={file._id}
                teacher={course.teacher}
                isAnnouncement={file?.title?.length > 0 ? true : false}
                id={course?._id}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center p-4 w-full h-full mx-auto border border-palePurple bg-softPurple rounded-[2rem] overflow-hidden">
          <div className="flex flex-col items-center mt-2">
            {course.title && (
              <img
                src={image1}
                alt="course"
                className={`fit-cover w-[80%] rounded-3xl m-1 mt-3 mb-2 ${getCourseColor(
                  course.title
                )}
        `}
              />
            )}
            <h1 className="title !text-[20px] !text-center ">{course.title}</h1>
            <p className="text-[14px]">{course.description}</p>
          </div>
          <div className="flex flex-col items-center m-4 w-full">
            <h1 className="title !text-[20px]">Teacher</h1>
            <div className="flex items-center w-full pl-16">
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
          <div className="flex flex-col items-center m-4 w-full">
            <h1 className="title !text-[20px]">Students</h1>
            <div className="flex flex-col gap-2 w-full">
              {students.map((student) => (
                <div className="flex items-center w-full pl-16">
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
      <DeletePopup
        trigger={popup}
        onDelete={() => handleDelete(accessToken, id)}
        itemToBeDeleted={course.title + " Course"}
        setTrigger={setPopup}
      />
    </div>
  );
};

export default CourseDetails;
