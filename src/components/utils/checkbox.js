import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useId } from "react";
import "./checkbox.css";

const Checkbox = (props) => {
  // Generate a unique ID if none is provided
  const uniqueId = useId();
  const checkboxId = props.id || `checkbox-${uniqueId}`;

  return (
    <div className="flex items-center">
      <label htmlFor={checkboxId} className="cursor-pointer relative">
        <input
          type="checkbox"
          className=" w-6 h-6 appearance-none rounded bg-white  click1  focus:border-none "
          id={checkboxId}
          defaultChecked={false}
          checked={props?.checked || false}
          disabled={props?.disabled}
          onChange={props?.onChange}
          onClick={props?.onClick}
        />
        <Icon
          icon="jam:check"
          className="text-darkPurple absolute border-2 border-palePurple rounded top-[0px] h-6 w-6 left-[0px] text-opacity-0 check-1 transition "
        />
      </label>
    </div>
  );
};

export default Checkbox;
