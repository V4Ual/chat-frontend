import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getTokenForLocalStorage, setTokenLocalStorage } from "../service/extraServices";
import { login } from "../services/AxiosServer";

const Login = () => {

  const navigate = useNavigate()
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  })

  const handleLogin = (e) => {
    const { name, value } = e.target
    setLoginData({
      ...loginData, [name]: value
    })
    console.log(loginData);

  }

  const loginSend = async () => {
    const loginResponses = await login(loginData)
    console.log('======================>>>>>', loginResponses);
    if (loginResponses.success == true) {
      const _id = loginResponses.data._id
      const token = loginResponses.data.token
      setTokenLocalStorage({ _id: _id, token: token })
      navigate(`/${_id}/chat`)

    }
  }
  // useEffect(() => {
  //   const getID = getTokenForLocalStorage()

  //   getID ? navigate(`/${getID}/chat`) : navigate('/')
  // }, [])
  return (
    <div className="bg-gray-200 h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-96 justify-center align-middle">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>

        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Email</label>
            <input value={loginData.email} onChange={handleLogin} type="email" id="email" name="email" className="mt-1 p-2 w-full border rounded-md" />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Password</label>
            <input value={loginData.password} onChange={handleLogin} type="text" id="password" name="password" className="mt-1 p-2 w-full border rounded-md" />
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

          <button onClick={loginSend} className="bg-blue-500 text-white px-4 py-2 rounded-md">Submit</button>
          <Link className="bg-blue-500 text-white px-4 py-2 rounded-md" to="/registration">
            Registration
          </Link>

        </div>
      </div>
    </div>
  );
};

export default Login;
