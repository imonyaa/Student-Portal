import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import ErrorMessage from "../../components/utils/errorMessage";
import { Icon } from "@iconify/react/dist/iconify.js";
import Button from "../../components/utils/button";
import axios from "axios";
import Cookies from "js-cookie";
import { Toaster, toast } from "sonner";

const CreateCoursePopup = ({ setTrigger, trigger }) => {
  const accessToken = Cookies.get("accessToken");
  const CourseSchema = yup.object().shape({
    title: yup.string().required("You must give the course a name"),
    description: yup.string().required("You must add a description"),
    academicLevel: yup.string().required("You must add an academic level"),
    academicYear: yup
      .number()
      .min(1, "You must add an academic year")
      .required(),
    major: yup.string().when("academicLevel", {
      is: "Master",
      then: (schema) => schema.required("You must add a major"),
    }),
  });

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(CourseSchema),
  });

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await axios.post(
        `https://student-portal-backend-0kg8.onrender.com/api/courses`,
        { ...data, materials: ["pdf", "video"] },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response.data);
      toast.success("Course created successfully", {
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
  };

  return (
    <div>
      {trigger && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black/20">
          <div className=" p-10 bg-white rounded-2xl border border-palePurple flex flex-col gap-4 min-w-[30vw]">
            <div className=" flex flex-col  gap-3">
              <h1 className="title !text-[20px]">Create course</h1>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-4">
                <div className="flex items-start w-full flex-col  gap-1  ">
                  <p className="    font-roboto font-semibold   text-sm  ">
                    Course name
                  </p>
                  <div className="flex flex-col gap-1 w-full ">
                    <input
                      className="font-roboto bg-white align-right text-sm rounded-xl border border-palePurple flex-grow flex items-center justify-right px-4 py-3 w-full  "
                      type="text"
                      placeholder="Course name"
                      {...register("title")}
                    />
                    {errors.title && (
                      <ErrorMessage error={errors.title.message} />
                    )}
                  </div>
                </div>
                <div className="flex items-start w-full flex-col  gap-1 h-full  ">
                  <p className="    font-roboto font-semibold   text-sm  ">
                    Course description
                  </p>
                  <div className="flex flex-col gap-1 w-full h-full  ">
                    <textarea
                      className="font-roboto bg-white align-right text-sm resize-none rounded-xl border  border-palePurple flex-grow flex items-center justify-right px-4 py-3 h-full  w-full  "
                      type="textarea"
                      placeholder="Course description"
                      {...register("description")}
                    />
                    {errors.description && (
                      <ErrorMessage error={errors.description.message} />
                    )}
                  </div>
                </div>
                <div className="flex w-full gap-4 ">
                  <div className="flex items-start w-full flex-col  gap-1  ">
                    <p className="    font-roboto font-semibold   text-sm  ">
                      Academic level
                    </p>
                    <div className="flex flex-col gap-1 w-full ">
                      <div className="custom-select">
                        <select
                          className=" font-roboto bg-white align-right text-sm rounded-xl border border-palePurple flex-grow flex items-center justify-right px-4  py-3 w-full  "
                          placeholder="Course academic level"
                          defaultValue={""}
                          {...register("academicLevel")}
                        >
                          <option disabled value="">
                            select level
                          </option>
                          <option value="Licence">Licence</option>
                          <option value="Master">Master</option>
                        </select>
                        <Icon
                          icon={"raphael:arrowdown"}
                          className="chevron-icon text-lg inline"
                        />
                      </div>

                      {errors.academicLevel && (
                        <ErrorMessage
                          className="px-0"
                          error={errors.academicLevel.message}
                        />
                      )}
                    </div>
                  </div>
                  <div className="flex items-start w-full flex-col  gap-1  ">
                    <p className="    font-roboto font-semibold   text-sm  ">
                      Academic year
                    </p>
                    <div className="flex flex-col gap-1 w-full ">
                      <div className="custom-select">
                        <select
                          className=" font-roboto bg-white align-right text-sm rounded-xl border border-palePurple flex-grow flex items-center justify-right px-4  py-3 w-full  "
                          placeholder="year"
                          defaultValue={0}
                          {...register("academicYear")}
                        >
                          <option disabled value={0}>
                            select year
                          </option>
                          <option value={1}>1</option>
                          <option value={2}>2</option>
                          {watch("academicLevel") == "Licence" && (
                            <option value={3}>3</option>
                          )}
                        </select>
                        <Icon
                          icon={"raphael:arrowdown"}
                          className="chevron-icon text-lg inline"
                        />
                      </div>

                      {errors.academicYear && (
                        <ErrorMessage
                          className="px-0"
                          error={errors.academicYear.message}
                        />
                      )}
                    </div>
                  </div>
                </div>
                {watch("academicLevel") === "Master" && (
                  <div className="flex items-start w-full flex-col  gap-1  ">
                    <p className="    font-roboto font-semibold   text-sm  ">
                      Course major
                    </p>
                    <div className="flex flex-col gap-1 w-full ">
                      <div className="custom-select">
                        <select
                          className=" font-roboto bg-white align-right text-sm rounded-xl border border-palePurple flex-grow flex items-center justify-right px-4  py-3 w-full  "
                          defaultValue={""}
                          {...register("major")}
                        >
                          <option disabled value="">
                            select major
                          </option>
                          <option value="Control">Control Engineering</option>
                          <option value="Computer Engineering">
                            Computer Engineering
                          </option>
                          <option value="Power">Power Engineering</option>
                          <option value="Telecommunications">
                            Telecommunications
                          </option>
                        </select>
                        <Icon
                          icon={"raphael:arrowdown"}
                          className="chevron-icon text-lg inline"
                        />
                      </div>

                      {errors.major && (
                        <ErrorMessage
                          className="px-0"
                          error={errors.major.message}
                        />
                      )}
                    </div>
                  </div>
                )}

                <div className="flex justify-end gap-3">
                  <Button
                    type="button"
                    onClick={() => {
                      setTrigger(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Create</Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
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

export default CreateCoursePopup;
