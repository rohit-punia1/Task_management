import axios from "axios";
import getAPIMap from "../apiUrl";

export const getTasks = async () => {
  const url = getAPIMap("getTask");

  return axios.get(url);
};

export const getTaskById = async (taskId) => {
  let url = getAPIMap("getTaskById");

  url = url.replace("{taskId}", taskId);

  const response = await axios.get(url);
  

  return response;
};
