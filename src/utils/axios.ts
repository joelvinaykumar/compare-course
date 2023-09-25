import axios from "axios"
import { notification } from "antd"
import { REACT_APP_API_HOST, STORAGE_KEY_CONSTANT, USER_KEY_CONSTANT } from "./constants";
import { ROUTES } from "./routes.enum";

const instance =  axios.create({
  baseURL: REACT_APP_API_HOST,
  headers: {
    "Authorization": `Bearer ${localStorage.getItem(STORAGE_KEY_CONSTANT)}`
  },
  timeout: 15 * 1000,
})

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if(error?.response?.status === 401 || error?.response?.status === 403) {
      // logout
      localStorage.removeItem(USER_KEY_CONSTANT)
      localStorage.removeItem(STORAGE_KEY_CONSTANT)
      window.location.href = ROUTES.LOGIN
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