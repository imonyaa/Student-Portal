import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import "./checkbox.css";

const Checkbox = (props) => {
  return (
    <div className="flex items-center">
      <label htmlFor="checkBox" className="cursor-pointer relative">
        <input
          type="checkbox"
          className=" w-6 h-6 appearance-none  bg-white  click1  focus:border-none "
          id="checkBox"
          defaultChecked={false}
          checked={props?.checked || false}
          disabled={props?.disabled}
        />
        <Icon
          icon="jam:check"
          className="text-darkPurple absolute border-2 border-palePurple rounded top-0.5 h-6 w-6 left-0.5 text-opacity-0 check-1 transition "
        />
      </label>
    </div>
  );
};

export default Checkbox;
