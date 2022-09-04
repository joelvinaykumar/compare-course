import axios from "axios"
import { notification } from "antd"
import { STORAGE_KEY_CONSTANT } from "./constants";

const instance =  axios.create({
  baseURL: process.env.REACT_APP_API_HOST,
  headers: {
    "Authorization": `Bearer ${localStorage.getItem(STORAGE_KEY_CONSTANT)}`
  },
  timeout: 15 * 1000,
})

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if(error.response.status === 401 || error.response.status === 403) {
      // logout
    }
    if(error.response.status === 400) {
      const e = error.response.data.message
      if(typeof e === "object") {
        e.forEach((message: string) => {
          notification.error({ message })
        });
      }
    }
    return Promise.reject(error.response)
  }
);

export default instance