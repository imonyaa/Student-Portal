import React from "react";
import Button from "../../components/button";

const ProfileInfo = (props) => {
  const user = [
    {
      label: "Name ",
      value: props.user.name,
    },
    {
      label: "Email ",
      value: props.user.email,
    },
    {
      label: "User ID ",
      value: props.user.userID,
    },
    {
      label: "Academic Year ",
      value: props.user.academicYear,
    },
    {
      label: "Major ",
      value: props.user.major,
    },
    {
      label: "Group ",
      value: props.user.group,
    },
  ];
  return (
    <div className="flex w-full h-full items-center ">
      <div className="flex flex-col items-center justify-center pb-32 w-1/3 h-full rounded-[6rem] bg-white">
        <img
          src={
            props.user.image
              ? typeof props.user.image === "string"
                ? props.user.image
                : URL.createObjectURL(props.user.image[0])
              : null
          }
          className="flex justify-center items-center m-4 w-40 h-40 rounded-full cursor-auto border-lilac border-2 bg-lilac object-cover rounded-full"
          alt="userImage"
        />
        <p className="font-roboto font-semibold">{props.user.name}</p>
        <p className="font-roboto email-role">{props.user.email}</p>
        <p className="font-roboto email-role">{props.user.role}</p>
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
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
