import React, { useEffect, useState } from "react";
import EditFilled from "@ant-design/icons/EditFilled";
import PhoneFilled from "@ant-design/icons/PhoneFilled";
import VideoCameraFilled from "@ant-design/icons/VideoCameraFilled";
import "react-chat-elements/dist/main.css";
import Image from "next/image";

import { MessageBox, ChatItem } from "react-chat-elements";
import { Message } from "@/component/Messaage";
const LoginPage = () => {
    const [message, setMessage] = useState([
        [
            { id: 3, title: "Item 3" },
            { id: 3, title: "Item 3" },
            { id: 3, title: "Item 3" },
            { id: 3, title: "Item 3" },
            { id: 3, title: "Item 3" },
            { id: 3, title: "Item 3" },
            { id: 3, title: "Item 3" },
            { id: 3, title: "Item 3" },
            { id: 3, title: "Item 3" },
            { id: 3, title: "Item 3" },
            { id: 3, title: "Item 3" },
            { id: 3, title: "Item 3" },
            { id: 3, title: "Item 3" },
            { id: 3, title: "Item 3" },
            { id: 3, title: "Item 3" },
            { id: 3, title: "Item 3" },
            { id: 3, title: "Item 3" },
            { id: 3, title: "Item 3" },
            { id: 3, title: "Item 3" },
            { id: 3, title: "Item 3" },
        ],
    ]);

    const [image, setImage] = useState()

    const handleImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader(); // Create a new FileReader instance
            reader.onload = () => {
                // When the file has been read...
                setImage(reader.result); // Set the image data URI to state
            };
            reader.readAsDataURL(file); // Read the file as a Data URL
        }

    }

    const handleDownload = async (e) => {
        // const responses = await fetch(image)
        // console.log(responses);
        // const blob = await responses.blob()
        // const url = URL.createObjectURL(blob)
        // const a = document.createElement('a')
        // a.href = url
        // a.download = 'image.png'
        // a.click()
    }

    const sendMessage = () => {
        setMessage([...message, { id: 4, title: "vishal ires", image: image }]);
    };
    return (
        <>
            <div className='flex justify-around bg-[#128C7E]'>
                <div className='h-screen flex flex-col w-1/5 '>
                    <div className='flex-grow grow-0'>
                        <div className='ml-6 flex justify-between w-80'>
                            <h1 className='text-xl font-bold'>Chats</h1>
                            <div className='flex justify-end gap-8 mt-2 end-2'>
                                <EditFilled />
                                <EditFilled />
                            </div>
                        </div>
                        <div className='m-3'>
                            <div className='relative w-full'>
                                <input
                                    type='text'
                                    id='simple-search'
                                    class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                    placeholder='Search branch name...'
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <div className='flex-grow bg-red-400 overflow-x-auto scroll-smooth p-3 bg-[#128C7E]'>
                        {message.map((item, index) => {
                            return (
                                <div key={index} className='m-2 rounded-sm'>
                                    <ChatItem
                                        avatar={"https://facebook.github.io/react/img/logo.svg"}
                                        alt={"Reactjs"}
                                        title={"Facebook"}
                                        subtitle={"What are you doing?"}
                                        date={new Date()}
                                        unread={0}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className='h-screen flex flex-col flex-grow '>
                    <div className='flex-grow grow-0 bg-black'>
                        <div className='justify-around'>
                            <div className='flex justify-between gap-2 bg-[#34d399]'>
                                <div className='flex justify-start gap-3 items-center'>
                                    <img
                                        className='w-14 h-14 rounded-full mx-auto'
                                        src='https://images.rawpixel.com/image_png_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvMzY2LW1ja2luc2V5LTIxYTc3MzYtZm9uLWwtam9iNjU1LnBuZw.png'
                                    />
                                    <h1>vishal</h1>
                                </div>
                                <div className='flex justify-end gap-8 items-center mr-4'>
                                    <PhoneFilled />
                                    <VideoCameraFilled />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-grow bg-no-repeat bg-[url('https://w0.peakpx.com/wallpaper/818/148/HD-wallpaper-whatsapp-background-cool-dark-green-new-theme-whatsapp.jpg')]  bg-cover overflow-x-auto ">
                        {message.map((item, index) => {
                            return <Message key={index} text={item.title} image={item.image} onClickDownload={() => handleDownload()} />;


                        })}
                    </div>
                    <div className='flex'>
                        <input
                            type='search'
                            id='default-search'
                            className='block w-full p-4 ps-10 text-sm text-gray-900 border bg-[#34d399] rounded-lg bg-[#34d399] focus:[#34d399] focus:[#34d399] dark:[#34d399] dark:[#34d399] dark:placeholder-[#34d399] dark:text-white dark:focus:[#34d399] dark:focus:[#34d399]'
                            placeholder='Type here'
                            required
                        />
                        <div className='flex'>
                            <div className='flex items-center space-x-6'>
                                <div className='shrink-0'>
                                    <img
                                        id='preview_img'
                                        className='h-16 w-16 object-cover rounded-full'
                                        src={image}
                                        alt='Current profile photo'
                                    />
                                </div>
                                <label className='block'>
                                    <span className='sr-only'>Choose profile photo</span>
                                    <input
                                        type='file'
                                        onInputCapture={handleImage}
                                        className='block w-full text-sm text-slate-500
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-full file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-violet-50 file:text-violet-700
                                    hover:file:bg-violet-100
                                    '
                                    />
                                </label>
                            </div>

                            <button
                                onClick={sendMessage}
                                type='submit'
                                className='text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                            >
                                send
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
