import axios from "axios"
import { notification } from "antd"

const instance =  axios.create({
  baseURL: process.env.REACT_APP_API_HOST,
  headers: {},
  timeout: 10 * 1000,
})

instance.interceptors.response.use(
  (response) => response.data,
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