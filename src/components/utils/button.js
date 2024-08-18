import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

const Button = ({ onClick, type, children, className }) => {
  return (
    <button
      className={`${className} flex justify-center items-center px-4 py-2 self-center text-base rounded-2xl bg-lilac font-outfit cursor-pointer hover:bg-gloomyPurple  hover:text-white`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
