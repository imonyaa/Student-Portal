import React, { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import Button from "../../../../components/utils/button";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Tabs from "../../../../components/tabs/tabs";
import AssignmentsForm from "./forms/assignment-form";
import LectureForm from "./forms/lecture-form";
import AnnouncementForm from "./forms/announcement-form";

const MaterialPopup = ({ setTrigger, trigger, courseId }) => {
  const [activeTab, setActiveTab] = useState("lectures");
  return (
    trigger && (
      <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black/20">
        <div className=" p-10 bg-white rounded-2xl border border-palePurple flex flex-col gap-4 min-w-[30vw]">
          <div className=" flex flex-col  gap-3">
            <h1 className="title !text-[20px]">Add course material</h1>
          </div>
          <div className="flex flex-col gap-3">
            <Tabs
              onTabChange={setActiveTab}
              selectedIndex={activeTab}
              tabs={[
                {
                  label: "Lectures",
                  value: "lectures",
                },
                {
                  label: "Announcements",
                  value: "announcements",
                },
                {
                  label: "Assignments",
                  value: "assignments",
                },
              ]}
            />
          </div>
          {activeTab === "lectures" && (
            <LectureForm handleCancel={setTrigger} courseId={courseId} />
          )}
          {activeTab === "announcements" && (
            <AnnouncementForm handleCancel={setTrigger} courseId={courseId} />
          )}
        </div>
      </div>
    )
  );
};

export default MaterialPopup;
