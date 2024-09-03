import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Button from "../../components/utils/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useParams, useLocation } from "react-router-dom";
import { LectureCard } from "../../components/cards/lecture-cards/lecture-card";
import Cookies from "js-cookie";
import ReactPlayer from "react-player";
import Checkbox from "../../components/utils/checkbox";
import { useNavigate } from "react-router-dom";
import {
  fetchCourse,
  fetchFileContent,
  handleMarkCompletion,
} from "./functions-handlers";

const LecturePreview = (props) => {
  //--------------------------------------------------------useStates-----------------------------------------------

  const [fileContent, setFileContent] = useState("");
  const [course, setCourse] = useState({});
  const { id } = useParams();
  const { fileId } = useParams();
  const { pathname } = useLocation();
  const { user } = useSelector((state) => state.userReducer);
  const accessToken = Cookies.get("accessToken");
  const navigate = useNavigate();

  const file =
    Object.keys(course).length > 0 &&
    course?.files?.find((file) => file._id == fileId);

  //--------------------------------------------------------useEffects-----------------------------------------------
  useEffect(() => {
    document.title = props.title;
  }, [props.title]);

  useEffect(() => {
    fetchCourse(accessToken, setCourse, id);
    fetchFileContent(accessToken, fileId, setFileContent, id);
  }, [pathname]);

  //--------------------------------------------------------Utils-----------------------------------------------

  const checkCourseCompletion = (file, studentId) => {
    if (Object.keys(file).length == 0 || !studentId) {
      return false;
    }

    const status = file?.completionStatus?.filter(
      (status) => status?.student == studentId
    );

    if (status[0]?.completed) {
      return true;
    } else {
      return false;
    }
  };

  const getFileUrl = (file, fileContent) => {
    const pdfBlob = new Blob([fileContent], {
      type: file.fileType,
    });
    const url = URL.createObjectURL(pdfBlob);
    return url;
  };

  const markFileAsDone = () => {
    const studentId = user?.id;

    if (Object.keys(file).length == 0 || !studentId) {
      return;
    }

    const studentStatus = file?.completionStatus?.filter(
      (status) => status?.student == studentId
    );

    const updatedFile = {
      ...file,
      completionStatus: [
        ...file?.completionStatus?.filter(
          (status) => status?.student != studentId
        ),
        {
          ...studentStatus[0],
          completed: true,
        },
      ],
    };

    const updatedFileIndex = course?.files?.findIndex(
      (file) => file._id == fileId
    );

    const updatedCourseFiles = course?.files?.map((file, index) => {
      if (index == updatedFileIndex) {
        return updatedFile;
      } else {
        return file;
      }
    });

    const updatedCourse = {
      ...course,
      files: [...updatedCourseFiles],
    };

    setCourse(updatedCourse);
  };

  //---------------------------------------------------Variables-------------------------------------------------------

  const myCompleted = checkCourseCompletion(file, user?.id);

  //---------------------------------------------------file sorting-------------------------------------------------------

  const sortedFiles = course?.files
    ? course?.files?.sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
      )
    : [];
  const getNextIndex = (fileId) => {
    const nextIndex = sortedFiles.findIndex((file) => file._id == fileId) + 1;
    return nextIndex;
  };

  //------------------------------------------------rendering--------------------------------------------------------
  return (
    <div className="w-full h-full grid grid-cols-[0fr,1fr,0.3fr]">
      <div>
        <Button
          className="!rounded-full px-3 py-4 "
          onClick={() => window.history.back()}
        >
          <Icon icon="ion:chevron-back-outline" className="text-[20px]" />
        </Button>
      </div>
      <div className="h-[95%] max-h-[95vh] w-full">
        <h1 className="title !text-[28px] my-4 ml-9 ">{file.lectureName}</h1>
        <div className=" grid grid-rows-[10fr,1fr]  mr-8 border p-4 border-palePurple h-[95%] max-h-[75vh] rounded-[2rem] overflow-auto">
          {file.fileType === "application/pdf" && fileContent != "" ? (
            <iframe
              src={getFileUrl(file, fileContent)}
              className="w-full h-full p-4"
              title="pdf"
            ></iframe>
          ) : (
            <div className="w-full h-full max-h-[64vh] p-4">
              <ReactPlayer
                url={getFileUrl(file, fileContent)}
                playing={false}
                controls={true}
                width="100%"
                height="100%"
                stopOnUnmount={true}
                onEnded={() => handleMarkCompletion(accessToken, fileId)}
              />
            </div>
          )}
          <div className="w-full flex flex-row content-between">
            <div className="flex flex-col w-full">
              <h1 className=" px-8 font-outfit text-left !font-medium !text-gray-800 !text-[20px]">
                {file.lectureName}
              </h1>
              <p className=" px-8 font-roboto text-left !text-gray-800 !text-[14px]">
                {file.description}
              </p>
            </div>
            {user.role == "student" && (
              <div className="flex px-8 gap-4">
                <Button
                  className="w-20"
                  type="button"
                  onClick={() =>
                    handleMarkCompletion(
                      accessToken,
                      fileId,
                      id,
                      markFileAsDone
                    )
                  }
                >
                  {myCompleted ? (
                    <div className="flex items-center">
                      Done
                      <Icon icon="line-md:confirm" className="  ml-3" />
                    </div>
                  ) : (
                    <div className="w-full">Mark done</div>
                  )}
                </Button>

                {sortedFiles?.length > getNextIndex(fileId) && myCompleted && (
                  <Button
                    type="button"
                    onClick={() => {
                      navigate(
                        `/courses/${id}/${
                          sortedFiles[getNextIndex(fileId)]._id
                        }`
                      );
                    }}
                    className="!rounded-full px-3 py-4"
                  >
                    <Icon icon="line-md:chevron-right" />
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col  items-center  py-4  w-full h-full  mx-auto border border-palePurple bg-softPurple rounded-[2rem] overflow-hidden gap-4">
        <h1 className="  title !text-lg">Study next</h1>
        <div className="flex flex-col p-4  items-center w-full h-full overflow-y-auto mx-auto gap-4  overflow-hidden">
          {sortedFiles?.map((file) => (
            <LectureCard
              cardClickable={true}
              fileName={file?.lectureName}
              fileType={file?.fileType}
              description={""}
              completionStatus={file?.completionStatus || []}
              studentId={user?.id}
              fileId={file?._id}
              teacher={course?.teacher}
              isAnnouncement={false}
              id={course?._id}
              currentFile={fileId}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LecturePreview;
