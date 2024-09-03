import React from "react";
import Button from "./button";
import { Icon } from "@iconify/react/dist/iconify.js";

const DeletePopup = ({ setTrigger, itemToBeDeleted, trigger, onDelete }) => {
  return (
    trigger && (
      <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black/20">
        <div className=" p-4 bg-white rounded-2xl border border-palePurple flex flex-col gap-4">
          <div className=" flex flex-col m-3 gap-3">
            <h1 className="title !text-[20px]">Delete {itemToBeDeleted}</h1>
            <p className=" font-roboto">
              Are you sure you want to delete <strong>{itemToBeDeleted}</strong>
              ?
            </p>
          </div>
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              className=""
              onClick={() => {
                setTrigger(false);
              }}
            >
              Cancel
            </Button>
            <Button
              type="button"
              className="!bg-[#fa6363] text-white hover:!bg-red-500 focus:!outline-red-600"
              onClick={onDelete}
            >
              Delete
              <Icon icon="majesticons:delete-bin-line" className="ml-3 " />
            </Button>
          </div>
        </div>
      </div>
    )
  );
};

export default DeletePopup;
