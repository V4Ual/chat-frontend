import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registration } from "../services/AxiosServer";
import { setTokenLocalStorage } from "../service/extraServices";

export const useLoginHook = (phoneNumber) => {
  const navigation = useNavigate();
  const [registerData, setRegister] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [isLoading, setLoading] = useState();
  const [avatar, setAvatar] = useState("");

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setRegister((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const formData = new FormData();

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
    }
  };
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    console.log({ file });
    if (file) {
      const fileUrl = URL.createObjectURL(file);

      console.log({ fileUrl });
      setAvatar(fileUrl);
      setRegister((prev) => ({ ...prev, avatar: file }));
      //   const reader = new FileReader();
      //   setRegister((prev) => ({ ...prev, avatar: file }));
      //   reader.onloadend = () => {
      //     setAvatar(reader.result);
      //   };
      //   reader.readAsDataURL(file);
    }
  };

  return {
    handleSubmit,
    handleOnChange,
    handleImageUpload,
    avatar,
    registerData,
    isLoading,
  };
};
