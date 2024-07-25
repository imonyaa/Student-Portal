import React from "react";
import { useEffect, useState } from "react";



const Profile = (props) => {
    useEffect(()=>{document.title = props.title;},[props.title]);

    const user={
        userName: "Imane Otmanine",
        userRole: "Student",
        userImage: "https://img.freepik.com/free-photo/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair_285396-896.jpg",
        userEmail: "otmanine.imane@gmail.com",
        userID: "191932037791",
        userAcademicYear: "Master 2",
        userMajor: "Computer engineering",
        userGroup: "1"
    };

const [userImage, setUserImage] = useState("https://img.freepik.com/free-photo/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair_285396-896.jpg");
let disabled ="true";
    return (
        <section className="profile" id="profile">
            <div>
                <h1 className="title">Your Profile</h1>
            </div>
            <div className=" ">

                <div className="container  ">
                    <label htmlFor ="profile-picture" className="flex justify-center items-center w-10 h-10 rounded-full cursor-pointer  bg-lilac hover:bg-lilac "><img src={typeof userImage === "string"? user.userImage : URL.createObjectURL(userImage[0])} className="w-10 h-10 rounded-full" alt="userImage"/></label>
                    <input
                        className="hidden"
                        id="profile-picture"
                        type="file"
                        accept="image/png, image/gif, image/jpeg"
                        max = "1"
                        alt=""
                        onChange={(e) => setUserImage(e.target.files)}
                    />
                    <h3 className = "user-name">{user.userName}</h3>
                    <h3 className = "email-role">{user.userEmail}</h3>
                    <h3 className = "email-role">{user.userRole}</h3>
                </div>

                <div className="">
                <input
                className = {disabled? "disabled-input": "editable-input"}
                placeholder= " Full name "
                disabled = {(disabled)? "disabled" : ""}/>
                </div>
            </div>
        </section>
      );

};

export default Profile;
