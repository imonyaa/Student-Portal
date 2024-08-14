import React from "react";
import { useEffect, useState } from "react";

import ProfileInfo from "./profileInfo";
import EditProfileForm from "./editProfileForm";

import { useSelector } from "react-redux";

const Profile = (props) => {
  useEffect(() => {
    document.title = props.title;
  }, [props.title]);
  //fetch user data
  const { user } = useSelector((state) => state.userReducer);

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
          <EditProfileForm
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
