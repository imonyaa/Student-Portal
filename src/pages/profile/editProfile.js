import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorMessage from "./errorMessage";
import Button from "../../components/button";

const EditProfile = (props) => {
  const user = props.user;
  const schema = yup.object().shape({
    email: yup
      .string()
      .email("You must use a valid e-mail")
      .required("You must add an e-mail"),
    password: yup
      .string()
      .required("You must add a password")
      .min(8, "Your password must be at least 8 characters"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Your passwords do not match")
      .required("You must confirm your password"),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { image: user.image },
  });
  const [isDisabled, setIsDisabled] = useState(true);

  const onSubmit = (data) => {
    props.setIsDisabled(true);
    console.log(data);
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
        <p className="font-roboto font-semibold">{props.user.name}</p>
        <p className="font-roboto email-role">{props.user.email}</p>
        <p className="font-roboto email-role">{props.user.role}</p>
      </div>
      <div className="flex flex-col p-16 pl-1 pr-40  w-2/3 h-full gap-2">
        <p className=" font-outfit text-[1.7rem] pl-4 font-medium text-darkPurple mb-4">
          Edit Your Profile
        </p>
        <div className="flex items-start w-full ">
          <p className=" flex items-center justify-end font-roboto font-semibold text-right w-1/3 text-base h-12 m-1">
            Emailㅤ
          </p>
          <input
            className="font-roboto bg-white align-right rounded-full flex-grow flex items-center justify-right px-6 w-1/3 text-base h-14"
            type="text"
            placeholder="Email"
            {...register("email")}
          />
        </div>
        {errors.email && <ErrorMessage error={errors.email.message} />}
        <div className="flex items-start w-full ">
          <p className=" flex items-center justify-end font-roboto font-semibold text-right w-1/3 text-base h-12 m-1">
            Passwordㅤ
          </p>
          <input
            className="font-roboto bg-white align-right rounded-full flex-grow flex items-center justify-right px-6 w-1/3 text-base h-14"
            type="password"
            placeholder="Password"
            {...register("password")}
          />
        </div>
        {errors.password && <ErrorMessage error={errors.password.message} />}
        <div className="flex items-start w-full ">
          <p className=" flex items-center justify-end font-roboto font-semibold text-right w-1/3 text-base h-12 m-1">
            Confirm Passwordㅤ
          </p>
          <input
            className="font-roboto bg-white align-right rounded-full flex-grow flex items-center justify-right px-6 w-1/3 text-base h-14"
            type="password"
            placeholder="Confirm Password"
            {...register("confirmPassword")}
          />
        </div>
        {errors.confirmPassword && (
          <ErrorMessage error={errors.confirmPassword.message} />
        )}

        <div className="w-full mt-4 flex justify-end">
          <Button
            className="button"
            type="submit"
            onClick={() => setIsDisabled(true)}
          >
            Save
          </Button>
        </div>
      </div>
    </form>
  );
};

export default EditProfile;
