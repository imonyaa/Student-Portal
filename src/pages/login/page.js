import React from "react";
import { useEffect, useState } from "react";
import logo from "../../public/images/logo.svg";
import books from "../../public/images/books.png";
import Button from "../../components/utils/button";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorMessage from "../../components/utils/errorMessage";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import Cookies from "js-cookie";
import { setUser } from "../../state/user/userSlice";
import { useDispatch } from "react-redux";

function Login({ title, isLoggedIn, setIsLoggedIn }) {
  // set page title ----------------------------------------------------------------------------------------------------------
  useEffect(() => {
    document.title = title;
  }, [title]);

  const dispatch = useDispatch();

  const navigate = useNavigate();

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
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  // submit handler ----------------------------------------------------------------------------------------------------------
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "https://student-portal-backend-0kg8.onrender.com/api/auth/login",
        data,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response?.data);
      const accessToken = response?.data?.token;
      if (accessToken !== null) {
        const user = response?.data;
        Cookies.set("accessToken", accessToken, {
          expires: 30,
          secure: true,
          sameSite: "Strict",
        });
        setIsLoggedIn(true);
        dispatch(setUser(user));
        navigate("/dashboard");
      }
    } catch (error) {
      if (!error?.response) {
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
      }
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
                <div className="flex flex-col items-center w-full h-full ">
                  <div className=" flex flex-col w-2/3 gap-1">
                    <input
                      className="font-roboto bg-white align-right rounded-full flex-grow flex items-center justify-right mt-3 px-6 w-full text-base h-14"
                      type="text"
                      placeholder="Email"
                      {...register("email")}
                    />

                    {errors.email && (
                      <ErrorMessage error={errors.email.message} />
                    )}
                  </div>
                  <div className=" flex flex-col w-2/3 gap-1">
                    <input
                      className="font-roboto bg-white align-right rounded-full flex-grow flex items-center justify-right mt-3 px-6 w-full text-base h-14"
                      type="password"
                      placeholder="Password"
                      {...register("password")}
                    />

                    {errors.password && (
                      <ErrorMessage error={errors.password.message} />
                    )}
                  </div>

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
    </div>
  );
}

export default Login;
