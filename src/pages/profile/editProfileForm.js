import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorMessage from "../../components/utils/errorMessage";
import Button from "../../components/utils/button";
import axios from "../../api/axios";
import { Toaster, toast } from "sonner";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import { setUser } from "../../state/user/userSlice";
import { useDispatch } from "react-redux";

const EditProfileForm = (props) => {
  const dispatch = useDispatch();
  const user = props.user;
  const schema = yup.object().shape({
    email: yup
      .string()
      .email("You must use a valid e-mail")
      .required("You must add an e-mail"),
    currentPassword: yup
      .string()
      .required("You must fill your current password")
      .min(8, "The password must be at least 8 characters"),
    newPassword: yup
      .string()
      .required("You must add a password")
      .min(8, "Your password must be at least 8 characters"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("newPassword"), null], "Your passwords do not match"),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { image: user.profileImage },
  });
  const accessToken = Cookies.get("accessToken");

  // submit handler
  const onSubmit = async (data) => {
    console.log("Submitting form...");
    console.log(data);
    try {
      // Create a FormData object to handle file uploads along with other form data
      const formData = new FormData();

      // Append regular form data
      formData.append("email", data.email);
      formData.append("currentPassword", data.currentPassword);
      formData.append("newPassword", data.newPassword);

      // Append the image file if it exists
      if (data.image && data.image[0]) {
        formData.append("file", data.image[0]);
      }
      const response = await axios.put(
        "https://student-portal-backend-0kg8.onrender.com/api/users/me",
        formData,

        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log("response: " + response?.data);
      //  TODO: display success toast
      //  TODO: dispatch(setUser(response?.data?.user));
      //  TODO: props.setIsDisabled(true);
    } catch (error) {
      console.log("error:" + error);
      // FIXME: fix errors and what they display and toasters
      //  TODO: display error toast
      //  TODO: reset form after error
      /*if (!error?.response) {
        console.log(error);
        toast.error("No Server Response", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: 0,
          theme: "light",
        });
      } else if (error.response?.status === 401) {
        toast.error("Email or password is incorrect", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: 0,
          theme: "light",
        });
        setError("email", {
          type: "manual",
          message: error.response.data.message,
        });
      } else {
        toast.error("Log in failed!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: 0,
          theme: "light",
        });
      }*/
    }
  };

  return (
    <form
      className="flex w-full h-full items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col items-center justify-center pb-32 w-1/3 h-full rounded-[6rem] bg-white">
        <label
          htmlFor="profile-picture"
          className={
            "flex justify-center items-center m-4 w-40 h-40 rounded-full cursor-pointer  bg-lilac hover:bg-purple "
          }
        >
          <img
            src={
              watch("image")
                ? typeof watch("image") === "string"
                  ? watch("image")
                  : URL.createObjectURL(watch("image")[0])
                : null
            }
            className="w-[155px] h-[155px] object-cover rounded-full"
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
          {...register("image")}
        />
        <p className="font-roboto font-semibold">
          {props.user.firstName + " " + props.user.lastName}
        </p>
        <p className="font-roboto email-role">{props.user.email}</p>
        <p className="font-roboto email-role font-medium">{props.user.role}</p>
      </div>
      <div className="flex flex-col justify-center p-16 pl-1 pr-40  w-2/3 h-full gap-2">
        <p className=" font-outfit text-[1.7rem] pl-4 font-medium text-darkPurple mb-4">
          Edit Your Profile
        </p>
        <div className="flex items-start w-full ">
          <p className=" flex items-center justify-end font-roboto font-semibold text-right w-1/3 text-base h-12 m-1">
            Emailㅤ
          </p>
          <div className="flex flex-col gap-1 w-2/3">
            <input
              className="font-roboto bg-white align-right rounded-full flex-grow flex items-center justify-right px-6 w-full text-base h-14"
              type="text"
              placeholder="Email"
              {...register("email")}
            />
            {errors.email && <ErrorMessage error={errors.email.message} />}
          </div>
        </div>

        <div className="flex items-start w-full ">
          <p className=" flex items-center justify-end font-roboto font-semibold text-right w-1/3 text-base h-12 m-1">
            Current Passwordㅤ
          </p>
          <div className="flex flex-col w-2/3 gap-1">
            <input
              className="font-roboto bg-white align-right rounded-full flex-grow flex items-center justify-right px-6 w-full text-base h-14"
              type="password"
              placeholder="Current Password"
              {...register("currentPassword")}
            />
            {errors.currentPassword && (
              <ErrorMessage error={errors.currentPassword.message} />
            )}
          </div>
        </div>

        <div className="flex items-start w-full ">
          <p className=" flex items-center justify-end font-roboto font-semibold text-right w-1/3 text-base h-12 m-1">
            Passwordㅤ
          </p>
          <div className="flex flex-col gap-1 w-2/3 ">
            <input
              className="font-roboto bg-white align-right rounded-full flex-grow flex items-center justify-right px-6 w-full text-base h-14"
              type="password"
              placeholder="Password"
              {...register("newPassword")}
            />
            {errors.password && (
              <ErrorMessage error={errors.password.message} />
            )}
          </div>
        </div>

        <div className="flex items-start w-full ">
          <p className=" flex items-center justify-end font-roboto font-semibold text-right w-1/3 text-base h-12 m-1">
            Confirm Passwordㅤ
          </p>
          <div className="flex flex-col gap-1 w-2/3">
            <input
              className="font-roboto bg-white align-right rounded-full flex-grow flex items-center justify-right px-6 w-full text-base h-14"
              type="password"
              placeholder="Confirm Password"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <ErrorMessage error={errors.confirmPassword.message} />
            )}
          </div>
        </div>

        <div className="w-full mt-4 flex justify-end gap-3">
          <Button
            className="button"
            type="button"
            onClick={() => props.setIsDisabled(true)}
          >
            Cancel
          </Button>
          <Button className="button" type="submit" onClick={handleSubmit}>
            Save
          </Button>
        </div>
      </div>
    </form>
  );
};

export default EditProfileForm;
