import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import ErrorMessage from "../../../../../components/utils/errorMessage";
import { Icon } from "@iconify/react/dist/iconify.js";
import Button from "../../../../../components/utils/button";
import axios from "axios";
import Cookies from "js-cookie";
import { Toaster, toast } from "sonner";

const AnnouncementForm = ({ handleCancel, courseId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const LectureDetailsSchema = yup.object().shape({
    description: yup.string().required("You must add a description"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LectureDetailsSchema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    const accessToken = Cookies.get("accessToken");
    try {
      const response = await axios.post(
        `https://student-portal-backend-0kg8.onrender.com/api/announcements`,
        {
          title: "a",
          content: data.description,
          courses: [courseId, null],
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      console.log(response);
      if (response.status >= 200 || response.status <= 299) {
        toast.success("Announcement created successfully", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: 0,
          theme: "light",
        });
        window.location.reload();
      }
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

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        <div className="flex items-start w-full flex-col  gap-1 h-full  ">
          <p className="    font-roboto font-semibold   text-sm  ">
            Announcement Content
          </p>
          <div className="flex flex-col gap-1 w-full h-[10rem]  ">
            <textarea
              className="font-roboto bg-white align-right text-sm resize-none rounded-xl border  border-palePurple flex-grow flex items-center justify-right px-4 py-3 h-full  w-full  "
              type="textarea"
              placeholder="Description"
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

        <div className="flex justify-end gap-3">
          <Button
            type="button"
            onClick={() => {
              handleCancel();
            }}
          >
            Cancel
          </Button>
          <Button type="submit" onClick={() => {}}>
            Create
            {isLoading && (
              <Icon icon="ei:spinner-3" className="ml-3 text-xl animate-spin" />
            )}
          </Button>
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

export default AnnouncementForm;
