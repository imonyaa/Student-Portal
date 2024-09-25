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

const LectureForm = ({ handleCancel, courseId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const LectureDetailsSchema = yup.object().shape({
    lectureName: yup.string().required("You must add a title"),
    description: yup.string().required("You must add a description"),
    content: yup.mixed().required("You must add a content"),
  });

  const {
    register,
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LectureDetailsSchema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    const accessToken = Cookies.get("accessToken");
    const formData = new FormData();
    formData.append("lectureName", data.lectureName);
    formData.append("description", data.description);
    formData.append("file", data.content);

    try {
      const response = await axios.post(
        `https://student-portal-backend-0kg8.onrender.com/api/courses/${courseId}/upload`,
        formData,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      console.log(response.data);
      if (response.status === 200) {
        toast.success("File uploaded successfully", {
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
      window.location.reload();
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
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <div className="flex items-start w-full flex-col  gap-1  ">
            <p className="    font-roboto font-semibold   text-sm  ">
              Lecture title
            </p>
            <div className="flex flex-col gap-1 w-full ">
              <input
                className="font-roboto bg-white align-right text-sm rounded-xl border border-palePurple flex-grow flex items-center justify-right px-4 py-3 w-full  "
                type="text"
                placeholder="Lecture title"
                {...register("lectureName")}
              />
              {errors.lectureName && (
                <ErrorMessage
                  className="px-0"
                  error={errors.lectureName.message}
                />
              )}
            </div>
          </div>
          <div className="flex items-start w-full flex-col  gap-1 h-full  ">
            <p className="    font-roboto font-semibold   text-sm  ">
              Lecture description
            </p>
            <div className="flex flex-col gap-1 w-full h-full  ">
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
          <div className="flex items-start w-full flex-col  gap-1 h-full  ">
            <p className="    font-roboto font-semibold   text-sm  ">
              Lecture content
            </p>
            <div className="flex flex-col gap-2 w-full h-full  ">
              <label
                htmlFor="file"
                className="flex flex-col w-full h-full p-3 items-center justify-center hover:!bg-mostSoftPurple cursor-pointer border border-palePurple rounded-xl"
              >
                <Icon
                  icon="icon-park-outline:upload-two"
                  className="text-[3rem] text-gray-400 "
                />
                <p className="  text-xs text-gray-400 font-roboto font-semibold">
                  Choose file to upload
                  <br />
                  (PDF, Video)
                </p>
              </label>
              <Controller
                control={control}
                name="content"
                render={({ field }) => (
                  <input
                    className="hidden  "
                    type="file"
                    accept="application/pdf,video/mp4, video/avi, video/mov"
                    onChange={(e) => field.onChange(e.target.files[0])}
                    id={"file"}
                  />
                )}
              />

              {errors.content && (
                <ErrorMessage className="px-0" error={errors.content.message} />
              )}
              {watch("content") && (
                <div className=" w-full p-4 flex items-center justify-between border gap-4 border-palePurple rounded-xl">
                  <Icon icon="mdi:file" className="text-purple text-4xl" />
                  <div className="w-full flex justify-between items-end">
                    <div className="flex flex-col items-start gap-1 ">
                      <p className="text-xs text-gray-500">
                        {watch("content").name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {watch("content").type}
                      </p>
                    </div>

                    <p className="text-xs text-gray-500 w-fit flex h-full items-end  ">
                      {(watch("content").size / 1000).toFixed(2)} KB
                    </p>
                  </div>
                </div>
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
              Upload
              {isLoading && (
                <Icon
                  icon="ei:spinner-3"
                  className="ml-3 text-xl animate-spin"
                />
              )}
            </Button>
          </div>
        </div>
      </form>
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
};

export default LectureForm;
