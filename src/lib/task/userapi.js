import axios from "axios";
import getAPIMap from "../apiUrl";

export const getUserById = (taskId) => {
  let url = getAPIMap("getUserById");

  url = url.replace("{userId}", taskId);

  return axios.get(url);
};
