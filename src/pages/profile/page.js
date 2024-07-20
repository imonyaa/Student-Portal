import React from "react";
import { useEffect } from "react";

import "./profile.css";

const Profile = (props) => {
    useEffect(()=>{document.title = props.title;},[props.title]);

    const user={
        userName: "Imane Otmanine",
        userRole: "Student",
        userImage: "https://randomuser.me/api/portraits/women/49.jpg",
        userEmail: "otmanine.imane@gmail.com",
        userID: "191932037791",
        userAcademicYear: "Master 2",
        userMajor: "Computer engineering",
        userGroup: "1"
    };

    return (
        <section className="profile" id="profile">
            <div>
                <h1 className="title">Your Profile</h1>
            </div>
            <div className="profile-card">

                <div className="left-container">
                    <img
                        className="user-image"
                        src={user.userImage}
                        alt=""
                    />
                    <h3 className = "user-name">{user.userName}</h3>
                    <h3 className = "email-role">{user.userEmail}</h3>
                    <h3 className = "email-role">{user.userRole}</h3>
                </div>

                <div className="right-container">

                </div>
            </div>
        </section>
      );

};

export default Profile;
