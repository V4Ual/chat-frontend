import { Link, Navigate, useNavigate } from "react-router-dom";
import { registration } from "../services/AxiosServer";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
const Registration = () => {
  const navigator = useNavigate();
  const [loginData, setLoginData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    confirmPassword: "",
  });

  const handleRegistration = async (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSend = async () => {
    const data = await registration(loginData);
    console.log(data.success == true);
    if (data.success == true) {
      const getID = localStorage.getItem("_id");
      navigator(`/${getID}/chat`);
      toast.success("Registration Successfully");
    } else {
      toast.error(data.error);
    }
    //  Navigator.to('/')
  };

  useEffect(() => {
    const getID = localStorage.getItem("_id");
    console.log(getID);
    // if (getID) {
    //   navigator(`/${getID}/chat`)
    // }
  }, []);

  return (
    <div className="bg-gray-200 h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-96 justify-center align-middle">
        <h2 className="text-2xl font-semibold mb-4">Registration</h2>

        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Username
            </label>
            <input
              onChange={handleRegistration}
              type="name"
              value={loginData.name}
              id="username"
              name="name"
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              onChange={handleRegistration}
              type="email"
              value={loginData.email}
              id="username"
              name="email"
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Phone Number
            </label>
            <input
              onChange={handleRegistration}
              type="phon"
              value={loginData.phoneNumber}
              id="phoneNumber"
              name="phoneNumber"
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              onChange={handleRegistration}
              type="text"
              value={loginData.password}
              id="password"
              name="password"
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Confirm Password
            </label>
            <input
              onChange={handleRegistration}
              type="password"
              value={loginData.confirmPassword}
              id="password"
              name="confirmPassword"
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          <div className="flex items-center justify-between mb-4">
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox" />
              <span className="ml-2 text-sm">Remember me</span>
            </label>

            <a href="#" className="text-sm text-blue-500">
              Forgot password?
            </a>
          </div>
        </form>

        <div className="grid grid-cols-2 gap-2">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={handleSend}
          >
            Submit
          </button>
          <Link className="bg-blue-500 text-white px-4 py-2 rounded-md" to="/">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Registration;
