import React from "react";
import Button from "../../components/utils/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect } from "react";

const AddLecture = (props) => {
  useEffect(() => {
    document.title = props.title;
  }, [props.title]);
  return (
    <div>
      <Button
        className="rounded-full px-3 py-4 "
        onClick={() => window.history.back()}
      >
        <Icon icon="ion:chevron-back-outline" className="text-[20px]" />
      </Button>
      <h1>works</h1>
    </div>
  );
};

export default AddLecture;
