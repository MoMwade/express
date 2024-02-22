import axios from "axios";

const request = axios.create({
  timeout: 3000,
});

request.defaults.withCredentials = true;

request.interceptors.request.use((config) => {
  return config;
});

request.interceptors.response.use((response) => {
  return response;
});

export default request;
