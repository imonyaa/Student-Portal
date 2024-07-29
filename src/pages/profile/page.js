import React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const Profile = (props) => {
  useEffect(() => {
    document.title = props.title;
  }, [props.title]);

  const user = {
    userName: "Imane Otmanine",
    userRole: "Student",
    userImage:
      "https://img.freepik.com/free-photo/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair_285396-896.jpg",
    userEmail: "otmanine.imane@gmail.com",
    userID: "191932037791",
    userAcademicYear: "Master 2",
    userMajor: "Computer engineering",
    userGroup: "1",
  };

  const schema = yup.object().shape({
    userEmail: yup.string().email().required(),
    userPassword: yup.string().min(8).required(),
    ConfirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], null)
      .required(),
  });

  const { register, handleSubmit } = useForm({ resolver: yupResolver(schema) });
  const [userImage, setUserImage] = useState("user.userImage");
  const [isDisabled, setIsDisabled] = useState(true);

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <section className="w-full h-full" id="profile">
      <div>
        <h1 className="title">Your Profile</h1>
      </div>
      <form
        className="container flex mg-auto w-full h-full bg-softPurple"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="container mg-auto flex flex-col items-center">
          <label
            htmlFor="profile-picture"
            className={
              isDisabled
                ? "cursor-auto"
                : "flex justify-center items-center  w-32 h-32 rounded-full cursor-pointer  bg-lilac hover:bg-lilac "
            }
          >
            <img
              src={
                userImage
                  ? typeof userImage === "string"
                    ? user.userImage
                    : URL.createObjectURL(userImage[0])
                  : null
              }
              className="w-32 h-32 object-cover rounded-full"
              alt="userImage"
            />
          </label>
          <input
            className="hidden"
            id="profile-picture"
            type="file"
            accept="image/png, image/gif, image/jpeg"
            max="1"
            alt=""
            disabled={isDisabled}
            onChange={(e) => setUserImage(e.target.files)}
            // {...register("userImage")}
          />
          <h3 className="user-name">{user.userName}</h3>
          <h3 className="email-role">{user.userEmail}</h3>
          <h3 className="email-role">{user.userRole}</h3>
        </div>
        <div className="flex flex-col">
          <input
            className="disabled-input"
            placeholder={user.userName}
            type="text"
            disabled={true}
          />
          <input
            className={isDisabled ? "disabled-input" : "editable-input"}
            placeholder={user.userEmail}
            type="text"
            {...register("userEmail")}
          />
          <input
            className={isDisabled ? "disabled-input" : "editable-input"}
            value={user.userID}
            type="text"
            disabled={true}
          />
          <input
            className={"disabled-input"}
            value={user.userAcademicYear}
            type="text"
            disabled={true}
          />
          <input
            className={"disabled-input"}
            value={user.userMajor}
            type="text"
            disabled={true}
          />
          <input
            className={"disabled-input"}
            value={user.userGroup}
            type="number"
            disabled={true}
          />
          <input
            type="submit"
            value={isDisabled ? "Edit profile" : "Save"}
            onClick={() => setIsDisabled(!isDisabled)}
          />
        </div>
      </form>
    </section>
  );
};

export default Profile;
