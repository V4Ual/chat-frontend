import { useNavigate } from "react-router-dom";

export const setTokenLocalStorage = (data) => {
  const { _id, token } = data;
  localStorage.setItem("_id", _id);
  localStorage.setItem("token", token);
  return;
};

export const getTokenForLocalStorage = (data) => {
  return localStorage.getItem(data);
};

export const navigateManage = () => {
  const navigate = useNavigate();

  const getData = localStorage.getItem("_id");
  navigate(`${getData}/chat`);
  console.log(getData);
  if (getData) {
  }
};
