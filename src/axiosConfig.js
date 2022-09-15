import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api"

// token interceptors axios

axios.interceptors.request.use(
  (config) => {
    config.headers["Accept"] = "application/json";
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);


// get api call axios

export const get = (url) => {
  return axios.get(BASE_URL + url);
};

// post api call axios

export const post = (url, data) => {
  return axios.post(BASE_URL + url, data);
};

// put api call axios

export const put = (url, data) => {
  return axios.put(BASE_URL + url, data);
};

// deleteReqeust api call axios

export const deleteEntry = (id) => {

  console.log(id)
  return axios.delete(BASE_URL + id)
}