import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../../components/utils/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useForm } from "react-hook-form";
import ErrorMessage from "../../../../components/utils/errorMessage";
import image1 from "../../../../public/images/noback.png";
import { getCourseColor } from "../../../../utils/utils";
import "../../../../App.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "../../../../api/axios";
import Cookies from "js-cookie";
import { Toaster, toast } from "sonner";

const EditCourseDetails = ({ title, description, id, course }) => {
  const accessToken = Cookies.get("accessToken");

  const courseDetailsSchema = yup.object().shape({
    title: yup.string().required("You must add a title"),
    description: yup.string().required("You must add a description"),
    academicYear: yup
      .number()
      .min(1, "You must add an academic year")
      .required(),
    academicLevel: yup.string().required("You must add an academic level"),
    // major is required if academic level is master
    major: yup.string().when("academicLevel", {
      is: "Master",
      then: (schema) => schema.required("You must add a major"),
    }),
  });

  const [isEditable, setIsEditable] = useState(false);

  const {
    register,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(courseDetailsSchema),
  });

  useEffect(() => {
    reset({
      title: course?.title || "",
      description: course?.description || "",
      academicYear: course?.academicYear || 0,
      academicLevel: course?.academicLevel || "",
      major: course?.major || "",
    });
  }, [course]);

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await axios.put(
        `https://student-portal-backend-0kg8.onrender.com/api/courses/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response.data);
      toast.success("Course details updated successfully", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        theme: "light",
      });
      setIsEditable(!isEditable);
    } catch (error) {
      console.log(error);
      toast.error("An error happened please try again", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        theme: "light",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col p-5 px-12 gap-3 w-full border border-gray-200 rounded-[2rem] "
    >
      <div className="flex w-full justify-between items-center">
        <h1 className="title !font-normal !text-[20px]">Course Details</h1>
        <div className="flex gap-4">
          <Button
            type={"button"}
            onClick={() => {
              setIsEditable(!isEditable);
            }}
          >
            {isEditable ? "Cancel" : "Edit details"}
            {isEditable ? null : (
              <Icon icon="fluent:edit-32-regular" className="ml-3" />
            )}
          </Button>
          {isEditable && (
            <div className="col-span-3 w-full flex justify-end">
              <Button type="submit">Save</Button>
            </div>
          )}
        </div>
      </div>
      <div className="w-full h-full grid grid-cols-[0.7fr,1fr,1fr] gap-x-14 gap-y-4">
        <img
          src={image1}
          alt="course"
          className={`course-image !h-full  ${getCourseColor(
            course?.title || "a"
          )}
        `}
        />
        <div className="flex flex-col gap-4">
          <div className="flex items-start w-full flex-col w-full gap-1  ">
            <p className="    font-roboto font-semibold   text-sm  ">
              Course name
            </p>
            <div className="flex flex-col gap-1 w-full ">
              <input
                className="font-roboto bg-white align-right text-sm rounded-xl border border-palePurple flex-grow flex items-center justify-right px-4 py-3 w-full disabled:text-[#545454] "
                type="text"
                placeholder="Course name"
                disabled={!isEditable}
                {...register("title")}
              />
              {errors.title && (
                <ErrorMessage className="px-0" error={errors.title.message} />
              )}
            </div>
          </div>
          <div className="flex items-start w-full flex-col  gap-1 h-full  ">
            <p className="    font-roboto font-semibold   text-sm  ">
              Description
            </p>
            <div className="flex flex-col gap-1 w-full h-full  ">
              <textarea
                className="font-roboto bg-white align-right text-sm resize-none rounded-xl border  border-palePurple flex-grow flex items-center justify-right px-4 py-3 h-full  w-full disabled:text-[#545454] "
                type="textarea"
                placeholder="Description"
                disabled={!isEditable}
                {...register("description")}
              />
              {errors.description && (
                <ErrorMessage
                  className="px-0"
                  error={errors.description.message}
                />
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 h-full ">
          <div className="flex items-start w-full flex-col  gap-1  ">
            <p className="    font-roboto font-semibold   text-sm  ">
              Course academic level
            </p>
            <div className="flex flex-col gap-1 w-full ">
              <div className="custom-select">
                <select
                  className=" font-roboto bg-white align-right text-sm rounded-xl border border-palePurple flex-grow flex items-center justify-right px-4  py-3 w-full  "
                  placeholder="Course academic level"
                  defaultValue={""}
                  disabled={!isEditable}
                  {...register("academicLevel")}
                >
                  <option disabled value="">
                    Please select academic level
                  </option>
                  <option value="Licence">Licence</option>
                  <option value="Master">Master</option>
                </select>
                <Icon
                  icon={"raphael:arrowdown"}
                  className="chevron-icon text-lg inline"
                />
              </div>

              {errors.academicLevel && (
                <ErrorMessage
                  className="px-0"
                  error={errors.academicLevel.message}
                />
              )}
            </div>
          </div>
          <div className="flex items-start w-full flex-col  gap-1  ">
            <p className="    font-roboto font-semibold   text-sm  ">
              Course academic year
            </p>
            <div className="flex flex-col gap-1 w-full ">
              <div className="custom-select">
                <select
                  className=" font-roboto bg-white align-right text-sm rounded-xl border border-palePurple flex-grow flex items-center justify-right px-4  py-3 w-full  "
                  placeholder="Course academic level"
                  defaultValue={0}
                  disabled={!isEditable}
                  {...register("academicYear")}
                >
                  <option disabled value={0}>
                    Please select academic year
                  </option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  {watch("academicLevel") == "License" && (
                    <option value={3}>3</option>
                  )}
                </select>
                <Icon
                  icon={"raphael:arrowdown"}
                  className="chevron-icon text-lg inline"
                />
              </div>

              {errors.academicYear && (
                <ErrorMessage
                  className="px-0"
                  error={errors.academicYear.message}
                />
              )}
            </div>
          </div>
          {watch("academicLevel") === "Master" && (
            <div className="flex items-start w-full flex-col  gap-1  ">
              <p className="    font-roboto font-semibold   text-sm  ">
                Course major
              </p>
              <div className="flex flex-col gap-1 w-full ">
                <div className="custom-select">
                  <select
                    className=" font-roboto bg-white align-right text-sm rounded-xl border border-palePurple flex-grow flex items-center justify-right px-4  py-3 w-full  "
                    placeholder="Course academic level"
                    defaultValue={""}
                    disabled={!isEditable}
                    {...register("major")}
                  >
                    <option disabled value="">
                      Please select course major
                    </option>
                    <option value="Control">Control Engineering</option>
                    <option value="Computer Engineering">
                      Computer Engineering
                    </option>
                    <option value="Power">Power Engineering</option>
                    <option value="Telecommunications">
                      Telecommunications
                    </option>
                  </select>
                  <Icon
                    icon={"raphael:arrowdown"}
                    className="chevron-icon text-lg inline"
                  />
                </div>

                {errors.major && (
                  <ErrorMessage className="px-0" error={errors.major.message} />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <Toaster
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        richColors
      />
    </form>
  );
};

export default EditCourseDetails;
