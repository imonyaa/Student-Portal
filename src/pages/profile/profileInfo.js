import React, { useEffect } from "react";
import Button from "../../components/utils/button";
import { Icon } from "@iconify/react/dist/iconify.js";

const ProfileInfo = (props) => {
  const majorConvert = (major) => {
    switch (major) {
      case "Computer Engineering":
        return "Computer Engineering";
      case "Control":
        return "  Control Engineering";
      case "Power":
        return "Power Engineering";
      case "Telecommunications":
        return "Telecommunications";
      default:
        return "";
    }
  };
  const user = [
    {
      label: "Name ",
      value: props.user.firstName + " " + props.user.lastName,
    },
    {
      label: "Email ",
      value: props.user.email,
    },
    {
      label: "User ID ",
      value: props.user.userID,
    },
    props.user.role === "student" && {
      label: "Academic Year ",
      value: props.user.academicLevel + " " + props.user.academicYear,
    },
    props.user.role === "student" &&
      props.user.academicLevel == "Master" && {
        label: "Major ",
        value: majorConvert(props.user.major),
      },
    props.user.role === "student" && {
      label: "Group ",
      value: props.user.group,
    },
  ].filter(Boolean);
  return (
    <div className="flex w-full h-full items-center ">
      <div className="flex flex-col items-center justify-center pb-32 w-1/3 h-full rounded-[6rem] bg-white">
        <img
          src={
            props.user.profileImage
              ? typeof props.user.profileImage === "string"
                ? props.user.profileImage
                : URL.createObjectURL(props.user.profileImage[0])
              : null
          }
          className="flex justify-center items-center m-4 w-40 h-40  cursor-auto border-lilac border-2 bg-lilac object-cover rounded-full"
          alt="userImage"
        />
        <p className="font-roboto font-semibold">
          {props.user.firstName + " " + props.user.lastName}
        </p>
        <p className="font-roboto email-role">{props.user.email}</p>
        <p className="font-roboto email-role font-medium">{props.user.role}</p>
      </div>
      <div className="flex flex-col justify-center p-16 pl-1 pr-40  w-2/3 h-full gap-2">
        <p className=" font-outfit text-[1.7rem] pl-4 font-medium text-darkPurple mb-4">
          Your Information
        </p>
        {user.map((item, index) => (
          <div className="   flex items-start w-full ">
            <p className=" flex items-center justify-end font-roboto font-semibold text-right w-1/3 text-base h-12 m-1      ">
              {item.label}ㅤ
            </p>
            <p
              className="font-roboto bg-white align-right rounded-full flex-grow flex items-center justify-right px-6 w-1/3 text-base h-14"
              key={index}
              id={index}
            >
              {item.value}
            </p>
          </div>
        ))}
        <div className="w-full mt-4 flex justify-end">
          <Button onClick={() => props.setIsDisabled(false)}>
            Edit profile
            <Icon icon="fluent:edit-32-regular" className="ml-3" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
