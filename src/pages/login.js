import { loginHook } from '@/hooks/auth'
import Link from 'next/link'
const Login = () => {
    const { loginData, handleLoginChange, handleLoginPayload, isLoading, errorMessage } = loginHook()
    return (
        <>
            <div className="flex justify-center items-center h-screen">
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Email
                        </label>
                        <input name='email' value={loginData.email} onChange={(e) => handleLoginChange(e)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email" />
                        {
                            errorMessage.email && (
                                <span className='my-3 text-red-500'>{errorMessage.email}</span>
                            )
                        }
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" >
                            Password
                        </label>
                        <input name='password' value={loginData.password} onChange={(e) => handleLoginChange(e)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" />
                        {
                            errorMessage.password && (
                                <span className='my-3 text-red-500'>{errorMessage.password}</span>
                            )
                        }
                    </div>
                    <div className="flex items-center justify-between">
                        <button onClick={() => handleLoginPayload()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                            Sign In
                        </button>
                        <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                            Forgot Password?
                        </a>
                    </div>
                    <div className='mt-5'>
                        <Link className=' text-blue-500' href='/registration'>Registration</Link>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Login