import React from "react";
import { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import "./profile.css";
import { Icon } from "@iconify/react/dist/iconify.js";

const Profile = (props) => {
    useEffect(()=>{document.title = props.title;},[props.title]);
};

export default Profile;
