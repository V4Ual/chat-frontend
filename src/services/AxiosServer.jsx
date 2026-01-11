import axios from "axios";
import axiosApi from "../service/Axios";

export const registration = async (data) => {
  try {
    const response = await axiosApi.post("/v1/users/create", data);

    if (response.status === 200 || response.status === 201) {
      localStorage.setItem("_id", response.data.data._id);
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

export const fetchUserFromRoom = async (data) => {
  try {
    const response = await axiosApi.get(`room/user-list/${data}`);
    if (response.status === 200) {
      return { success: true, data: response.data.data };
    } else {
      throw new Error("Fail To fetch user");
    }
  } catch (error) {
    return { success: false, error: error.message || "Fail To fetch user" };
  }
};

export const fetchChatMessage = async (data) => {
  try {
    const response = await axiosApi.get(`/chat/${data}`);
    if (response.status === 200) {
      return { success: true, data: response.data.data };
    } else {
      throw new Error("Fail To chat message");
    }
  } catch (error) {
    return { success: false, error: error.message || "Fail To chat message" };
  }
};

export const login = async (data) => {
  try {
    const response = await axiosApi.post(`/users/login`, data);
    if (response.status === 200) {
      return { success: true, data: response.data.data };
    } else {
      throw new Error("Fail To chat message");
    }
  } catch (error) {
    return { success: false, error: error.message || "Fail To chat message" };
  }
};

export default axiosApi;
