import axios from "axios";
import { toast } from "react-toastify";
// import config from '../Config'

const axiosApi = axios.create({
  baseURL: "http://localhost:3001/api/v1",
});

// const getUserDetails = async(data) =>{
//     const getUserDetails = await axiosApi.get()
// }

export const registration = async (data) => {
  try {
    const response = await axiosApi.post("/users/create", data);

    if (response.status === 200 || response.status === 201) {
      return { success: true, data: response.data.data };
    } else {
      throw new Error("Registration failed");
    }
  } catch (error) {
    console.error("Registration error:", error.name);
    // toast.success(error)
    return { success: false, error: error.message || "Registration failed" };
  }
};

export default axiosApi;
