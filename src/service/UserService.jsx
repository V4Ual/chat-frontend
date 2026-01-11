import axiosApi from "./Axios";

export const fetchUserList = async () => {
  const response = await axiosApi.get("/v1/users/list");
  return response.data;
};

export const fetchRequestSend = async (requestObj) => {
  const response = await axiosApi.post("/v1/request", requestObj);
  return response.data;
};

export const fetchRequestList = async (requestObj) => {
  const response = await axiosApi.get("/v1/request", requestObj);
  return response.data;
};

export const fetchAccept = async (requestId) => {
  const response = await axiosApi.put(`/v1/request/accept/${requestId}`);
  return response.data;
};

export const fetchDecline = async (requestId) => {
  const response = await axiosApi.put(`/v1/request/decline/${requestId}`);
  return response.data;
};
  
export const fetchChatUserList = async () => {
  const response = await axiosApi.get(`/v1/room/user-list`);
  return response.data;
};

export const fetchChatMessageList = async (chatId) => {
  console.log({ chatId });
  const response = await axiosApi.get(`/v1/chat/${chatId}`);
  return response.data;
};

export const fetchGetUserDetails = async (chatId) => {
  const response = await axiosApi.get(`/v1/users/get-profile`);
  return response.data;
};
