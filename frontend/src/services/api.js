import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080",
});

export const getAllJobs = async () => {
  const response = await API.get("/allPosts");

  return response.data;
};

export const searchJobs = async (query) => {
  const response = await API.get(
    `/posts/${encodeURIComponent(query)}`
  );

  return response.data;
};

export const createJob = async (job) => {
  const response = await API.post(
    "/post",
    job
  );

  return response.data;
};