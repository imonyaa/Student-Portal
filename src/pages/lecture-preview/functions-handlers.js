import axios from "../../api/axios";

const fetchCourse = async (accessToken, setter, id) => {
  try {
    if (accessToken) {
      const response = await axios.get(
        "https://student-portal-backend-0kg8.onrender.com/api/courses/" + id,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      setter(response.data);
      console.log("course fetch", response.data);
    }
  } catch (error) {
    console.log(error);
    setter([]);
  }
};

const fetchFileContent = async (accessToken, fileId, setter, id) => {
  try {
    if (accessToken) {
      const response = await axios.get(
        "https://student-portal-backend-0kg8.onrender.com/api/courses/" +
          id +
          "/files/" +
          fileId +
          "/content",
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          responseType: "arraybuffer",
        }
      );

      setter(response.data);

      console.log("file content fetch", response.data);
    }
  } catch (error) {
    console.log(error);
    setter([]);
  }
};
const handleMarkCompletion = async (
  accessToken,
  fileId,
  id,
  markFileAsCompleted
) => {
  try {
    if (accessToken) {
      const response = await axios.put(
        "https://student-portal-backend-0kg8.onrender.com/api/courses/" +
          id +
          "/files/" +
          fileId +
          "/mark-completion",
        { completed: true },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
    }
    markFileAsCompleted();
  } catch (error) {
    console.log(error);
  }
};

export { fetchCourse, fetchFileContent, handleMarkCompletion };
