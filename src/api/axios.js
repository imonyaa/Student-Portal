import axios from "axios";

export default axios.create({
  baseURL: "https://student-portal-backend-0kg8.onrender.com/",
  headers: {
    "Content-Type": "application/json",
    withCredentials: true,
  },
});
