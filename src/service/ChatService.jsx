import axiosApi from "./Axios";

export const fetchSendMessage = async (chatMessageObj) => {
  const response = await axiosApi.post(`/v1/chat/message`, chatMessageObj);
  return response.data;
};
