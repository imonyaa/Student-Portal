import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Button from "../../components/utils/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useParams } from "react-router-dom";
import { LectureCard } from "../../components/cards/lecture-cards/lecture-card";
import axios from "../../api/axios";
import Cookies from "js-cookie";

const LecturePreview = (props) => {
  //--------------------------------------------------------useStates-----------------------------------------------
  const { user } = useSelector((state) => state.userReducer);
  const [file, setFile] = useState({});
  const [fileContent, setFileContent] = useState("");
  const [course, setCourse] = useState({});
  const [sortedFiles, setSortedFiles] = useState([]);
  const { id } = useParams();
  const { fileId } = useParams();
  const accessToken = Cookies.get("accessToken");
  //--------------------------------------------------------useEffects-----------------------------------------------
  useEffect(() => {
    document.title = props.title;
  }, [props.title]);
  useEffect(() => {
    const fetchCourse = async (accessToken, setter) => {
      try {
        if (accessToken) {
          const response = await axios.get(
            "http://localhost:3500/api/courses/" + id,
            {
              headers: { Authorization: `Bearer ${accessToken}` },
            }
          );
          setter(response.data);
          console.log(response.data);
        }
      } catch (error) {
        console.log(error);
        setter([]);
      }
    };
    const fetchFile = async (accessToken, fileId, setter) => {
      try {
        if (accessToken) {
          const response = await axios.get(
            "http://localhost:3500/api/courses/" + id + "/files/" + fileId,
            {
              headers: { Authorization: `Bearer ${accessToken}` },
            }
          );
          setter(response.data);
          console.log(response.data);
        }
      } catch (error) {
        console.log(error);
        setter([]);
      }
    };
    const fetchFileContent = async (accessToken, fileId, setter) => {
      try {
        if (accessToken) {
          const response = await axios.get(
            "http://localhost:3500/api/courses/" +
              id +
              "/files/" +
              fileId +
              "/content",
            {
              headers: { Authorization: `Bearer ${accessToken}` },
            }
          );
          setter(response.data);
          console.log(response.data);
        }
      } catch (error) {
        console.log(error);
        setter([]);
      }
    };

    fetchCourse(accessToken, setCourse);
    fetchFile(accessToken, fileId, setFile);
    fetchFileContent(accessToken, fileId, setFileContent);
  }, []);

  //------------------------------------------------handlers--------------------------------------------------------
  const handleMarkCompletion = async (accessToken, fileId) => {
    try {
      if (accessToken) {
        const response = await axios.put(
          "http://localhost:3500/api/courses/" +
            id +
            "/files/" +
            fileId +
            "/mark-completion",
          { completed: true },
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );

        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
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
      <div className="">
        <h1 className="title !text-[28px] my-4 ml-9 ">{file.fileName}</h1>
        <div className=" m-8 border border-palePurple rounded-[2rem]">
          {/* video player here */}
        </div>
      </div>
      <div className="flex flex-col items-center p-4 w-full h-full mx-auto border border-palePurple bg-softPurple rounded-[2rem] overflow-hidden">
        <div className="flex flex-col items-center p-4 w-[90%] h-full mx-auto gap-4  overflow-hidden">
          {sortedFiles?.map((file) => (
            <LectureCard
              fileName={
                file?.fileName ||
                course?.teacher?.firstName + " " + course?.teacher?.lastName
              }
              fileType={file?.fileType}
              description={file?.description || file?.content}
              completionStatus={file?.completionStatus || []}
              studentId={user?.id}
              fileId={file?._id}
              teacher={course?.teacher}
              isAnnouncement={file?.title?.length > 0 ? true : false}
              id={course?._id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LecturePreview;
