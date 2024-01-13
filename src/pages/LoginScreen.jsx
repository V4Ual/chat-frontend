import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate()
  const isLogin = true 
  useEffect(()=>{
    isLogin ? navigate('/userId/chat') : navigate('/login')
  })
  return (
    <div className="bg-gray-200 h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-96 justify-center align-middle">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>

        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Email</label>
            <input type="email" id="email" name="email" className="mt-1 p-2 w-full border rounded-md" />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Password</label>
            <input type="text" id="password" name="password" className="mt-1 p-2 w-full border rounded-md" />
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

        <Link className="bg-blue-500 text-white px-4 py-2 rounded-md" to="/registration">
          Registration
        </Link>
      </div>
    </div>
  );
};

export default Login;
