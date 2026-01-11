import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registration } from "../services/AxiosServer";
import { setTokenLocalStorage } from "../service/extraServices";
import {
  onLoginChangeValidation,
  onLoginSubmitValidation,
} from "../validation/LoginValidation";
import { toast } from "react-toastify";

export const useLoginHook = (phoneNumber) => {
  const navigation = useNavigate();
  const [registerData, setRegister] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [isLoading, setLoading] = useState();
  const [avatar, setAvatar] = useState("");

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setRegister((prev) => ({ ...prev, [name]: value }));

    const error = onLoginChangeValidation(name, value);
    setErrorMessage(error);
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    const error = onLoginSubmitValidation(registerData);
    if (Object.keys(error).length > 0) {
      setErrorMessage(error);
      return;
    }

    formData.append("name", registerData?.name);
    formData.append("email", registerData?.email);
    formData.append("phoneNumber", phoneNumber);
    formData.append("avatar", registerData?.avatar);

    const loginResponses = await registration(formData);
    if (loginResponses.success == true) {
      const _id = loginResponses.data._id;
      const token = loginResponses.data.token;
      setTokenLocalStorage({ _id: _id, token: token });
      navigation(`/${_id}/chat`);
    } else {
      toast.error(loginResponses.responseMessage);
    }
  };
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);

      setAvatar(fileUrl);
      setRegister((prev) => ({ ...prev, avatar: file }));
    }
  };

  return {
    handleSubmit,
    handleOnChange,
    handleImageUpload,
    avatar,
    registerData,
    isLoading,
    errorMessage,
  };
};
