import axios from "axios";

export default axios.create({
  baseURL: "https://localhost:3500",
  headers: {
    "Content-Type": "application/json",
    withCredentials: true,
  },
});
