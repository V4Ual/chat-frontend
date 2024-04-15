import { registrationHook } from "@/hooks/auth/registration.hook";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import { useState } from "react";
const Login = () => {
    const [isShow, setIsShow] = useState(false);
    const {
        registrationData,
        errorMessage,
        handlePayload,
        isLoading,
        handleChange,
    } = registrationHook();
    const togglePasswordVisibility = () => {
        setIsShow(!isShow);
    };

    return (
        <>
            <div className='flex justify-center items-center h-screen'>
                <div className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2'>
                            Full Name
                        </label>
                        <input
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            id='en'
                            type='firstName'
                            name='firstName'
                            value={registrationData.name}
                            onChange={(e) => handleChange(e)}
                            placeholder='Full Name'
                        />
                        {errorMessage.firstName && (
                            <span className='my-3 text-red-500'>
                                {errorMessage.firstName}
                            </span>
                        )}
                    </div>
                    <div className='mb-6'>
                        <label className='block text-gray-700 text-sm font-bold mb-2'>
                            Email
                        </label>
                        <input
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
                            id='email'
                            type='email'
                            name='email'
                            value={registrationData.email}
                            onChange={(e) => handleChange(e)}
                            placeholder='Email'
                        />
                        {errorMessage.email && (
                            <span className='my-3 text-red-500'>{errorMessage.email}</span>
                        )}
                    </div>
                    <div className='mb-6'>
                        <label className='block text-gray-700 text-sm font-bold mb-2'>
                            Phone Number
                        </label>
                        <input
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
                            id='phone-number'
                            type='phone-number'
                            name='phoneNumber'
                            value={registrationData.phoneNumber}
                            onChange={(e) => handleChange(e)}
                            placeholder='Phone Number'
                        />
                        {errorMessage.phoneNumber && (
                            <span className='my-3 text-red-500'>
                                {errorMessage.phoneNumber}
                            </span>
                        )}
                    </div>
                    <div className='mb-6 relative'>
                        <label className='block text-gray-700 text-sm font-bold mb-2'>
                            Password
                        </label>
                        <input
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
                            id='password'
                            type='password'
                            name='password'
                            value={registrationData.password}
                            onChange={(e) => handleChange(e)}
                            placeholder='******************'
                        />
                        <FontAwesomeIcon className="absolute top-9 inset-y-0 right-0 flex items-center pr-3 text-gray-600 focus:outline-none" icon={isShow ? faEyeSlash : faEye} onClick={togglePasswordVisibility} />

                        {errorMessage.password && (
                            <span className='my-3 text-red-500'>{errorMessage.password}</span>
                        )}
                    </div>
                    <div className='mb-6 relative'>
                        <label className='block text-gray-700 text-sm font-bold mb-2'>
                            Confirm Password
                        </label>
                        <input
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
                            id='password'
                            // type={isShow ? "password" : 'text'}
                            type={isShow ? "password" : "text"}
                            name='confirmPassword'
                            value={registrationData.confirmPassword}
                            onChange={(e) => handleChange(e)}
                            placeholder='******************'
                        />
                        <FontAwesomeIcon className="absolute top-9 inset-y-0 right-0 flex items-center pr-3 text-gray-600 focus:outline-none" icon={isShow ? faEyeSlash : faEye} onClick={togglePasswordVisibility} />

                        {/* <button onClick={() => isShow ? setIsShow(false) : setIsShow(true)} className="absolute top-3 inset-y-0 right-0 flex items-center pr-3 text-gray-600 focus:outline-none">dfs</button> */}
                        {/* {showPassword ? <FaEyeSlash /> : <FaEye />} */}
                        {errorMessage.confirmPassword && (
                            <span className='my-3 text-red-500'>
                                {errorMessage.confirmPassword}
                            </span>
                        )}
                    </div>
                    <div className='flex items-center justify-between'>
                        <button
                            onClick={handlePayload}
                            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                            type='button'
                        >
                            Sign In
                        </button>
                        <a
                            className='inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800'
                            href='#'
                        >
                            Forgot Password?
                        </a>
                    </div>
                    <div className='mt-5'>
                        <Link className=' text-blue-500' href='/login'>
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
