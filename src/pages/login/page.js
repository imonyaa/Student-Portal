import React from "react";
import { useEffect, useState } from "react";
import logo from "../../public/images/logo.svg";
import books from "../../public/images/books.png";
import Button from "../../components/button";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorMessage from "../../components/errorMessage";
import axios from "../../api/axios";

function Login(props) {
  // set page title ----------------------------------------------------------------------------------------------------------
  useEffect(() => {
    document.title = props.title;
  }, [props.title]);

  //validation schema ----------------------------------------------------------------------------------------------------------
  const schema = yup.object().shape({
    email: yup
      .string()
      .email("You must use a valid email")
      .required("You must fill your email"),
    password: yup
      .string()
      .required("You must fill your password")
      .min(8, "The password must be at least 8 characters"),
  });
  // useForm ----------------------------------------------------------------------------------------------------------
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: yupResolver(schema),
  });
  // submit handler ----------------------------------------------------------------------------------------------------------
  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await axios.post(
        "http://localhost:3500/api/auth/login",
        JSON.stringify(data),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response);
      props.setToken(response.token);
    } catch (error) {
      console.log(error);
    }
  };
  //states ----------------------------------------------------------------------------------------------------------
  const [isFormHidden, setIsFormHidden] = useState(true);

  //jsx ---------------------------------------------------------------------------------------------------------------
  return (
    <div
      className={
        isFormHidden
          ? "flex flex-col justify-evenly items-center w-11/12 h-full p-20 pb-1 mx-auto border border-palePurple bg-softPurple rounded-[6rem] overflow-hidden"
          : "flex flex-row justify-evenly items-center w-11/12 h-full p-20 pb-1 mx-auto border border-palePurple bg-softPurple rounded-[6rem] overflow-hidden"
      }
    >
      <div className="w-full">
        {
          //welcome to text
          isFormHidden && (
            <div className=" text-start text-2xl font-outfit">Welcome to</div>
          )
        }
        <div
          className={
            isFormHidden
              ? "flex flex-row items-center justify-evenly w-full"
              : "flex flex-col items-center justify-evenly w-full"
          }
        >
          <div className="flex flex-col justify-start h-full">
            <img src={logo} alt="logo" className="w-[26rem]"></img>
            <p className=" font-outfit w-[26rem]">
              E-learning Website for the Institute of Electrical & Electronic
              Engineering
            </p>
          </div>
          <img src={books} alt="logo" className="w-[26rem]"></img>
        </div>
      </div>

      {
        //login form
        !isFormHidden && (
          <div className="w-full flex-col  ">
            <h1 className=" text-2xl text-darkPurple font-outfit font-medium">
              LOG IN
            </h1>

            <div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col items-center w-full h-full">
                  <input
                    className="font-roboto bg-white align-right rounded-full flex-grow flex items-center justify-right mt-3 px-6 w-2/3 text-base h-14"
                    type="text"
                    placeholder="Email"
                    {...register("email")}
                  />

                  {errors.email && (
                    <ErrorMessage error={errors.email.message} />
                  )}

                  <input
                    className="font-roboto bg-white align-right rounded-full flex-grow flex items-center justify-right mt-3 px-6 w-2/3 text-base h-14"
                    type="password"
                    placeholder="Password"
                    {...register("password")}
                  />

                  {errors.password && (
                    <ErrorMessage error={errors.password.message} />
                  )}

                  <div className=" mt-4 w-2/3 flex justify-end">
                    <Button className="button" type="submit">
                      Log In
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )
      }

      {
        //button to see login form
        isFormHidden && (
          <div>
            <Button onClick={() => setIsFormHidden(false)}>Log in</Button>
          </div>
        )
      }
    </div>
  );
}

export default Login;