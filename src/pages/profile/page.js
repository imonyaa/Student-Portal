import React from "react";
import { useEffect, useState } from "react";

import ProfileInfo from "./profileInfo";
import EditProfile from "./editProfile";

const Profile = (props) => {
  useEffect(() => {
    document.title = props.title;
  }, [props.title]);
  //fetch user data
  const user = {
    name: "Imane Otmanine",
    role: "Student",
    image:
      "https://img.freepik.com/free-photo/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair_285396-896.jpg",
    email: "otmanine.imane@gmail.com",
    userID: "191932037791",
    academicYear: "Master 2",
    major: "Computer engineering",
    group: "1",
    password: "12345678",
    confirmPassword: "12345678",
  };

  const [isDisabled, setIsDisabled] = useState(true);

  return (
    <section className="w-full h-full " id="profile">
      <div>
        <h1 className="title">Your Profile</h1>
      </div>
      <div className="flex  items-center w-4/5 h-full mx-auto border border-palePurple bg-softPurple rounded-[6rem] overflow-hidden">
        {isDisabled ? (
          <ProfileInfo
            user={user}
            isDisabled={isDisabled}
            setIsDisabled={setIsDisabled}
          />
        ) : (
          <EditProfile
            user={user}
            isDisabled={isDisabled}
            setIsDisabled={setIsDisabled}
          />
        )}
      </div>
    </section>
  );
};

export default Profile;
