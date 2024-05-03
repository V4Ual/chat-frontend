import { Message } from "@/component/Messaage";
import ChatBox from "@/component/chatbox";
import { userListHook } from "@/hooks/room";
import { searchHook } from "@/hooks/users";
import { addMessage } from "@/redux/userSlice/chatMessage.slice";
import { userData } from "@/redux/userSlice/user.slice";
import { socket } from "@/socket";
import MessageFilled from "@ant-design/icons/MessageFilled";
import moment from "moment";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

const demo = () => {

    const {
        userList,
        sendMessage,
        handleChatList,
        chatItemData,
        message,
        handleMessage,
        handleFileChange,
        thumbnail,
        inputSearchHandle,
        activeUserId,
        getMessage
    } = userListHook();

    const chatBoxRef = useRef(null);

    const scrollToBottom = () => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [getMessage]);


    const dispatch = useDispatch()
    const userId = useSelector((state) => state.user)

    useEffect(() => {
        dispatch(userData())
    }, [])

    console.log(userId);
    if (userId && userId?.data) {
        socket.emit('user::connect', { id: userId?.data?._id })
    }

    useEffect(() => {
        socket.on('send::message', (data) => {
            dispatch(addMessage(data))
        })
        return () => {
            socket.off('send::message') // corrected event name
        }
    }, [])

    return (
        <div className='h-screen w-full flex antialiased text-gray-200 bg-gray-900 overflow-hidden'>
            <div className='flex-1 flex flex-col'>
                <div className='border-b-2 border-gray-800 p-2 flex flex-row z-20'>
                    <div className='bg-red-600 w-3 h-3 rounded-full mr-2'></div>
                    <div className='bg-yellow-500 w-3 h-3 rounded-full mr-2'></div>
                    <div className='bg-green-500 w-3 h-3 rounded-full mr-2'></div>
                </div>
                <main className='flex-grow flex flex-row min-h-0'>
                    <section className='flex flex-col flex-none overflow-auto w-24 group lg:max-w-sm md:w-2/5 transition-all duration-300 ease-in-out'>
                        <div className='header p-4 flex flex-row justify-between items-center flex-none'>
                            <div
                                className='w-16 h-16 relative flex flex-shrink-0'
                            // style={{ filter: "invert(100%)" }}
                            >
                                {
                                    <img
                                        className='rounded-full w-full h-full object-cover'
                                        alt='ravisankarchinnam'
                                        src={userId?.data?.profilePic}
                                    />

                                }
                            </div>
                            <p className='text-md font-bold hidden md:block group-hover:block'>
                                Messenger
                            </p>
                            <a
                                href='#'
                                className='block rounded-full hover:bg-gray-700 bg-gray-800 w-10 h-10 p-2'
                            >
                                <svg viewBox='0 0 24 24' className='w-full h-full fill-current'>
                                    <path d='M6.3 12.3l10-10a1 1 0 0 1 1.4 0l4 4a1 1 0 0 1 0 1.4l-10 10a1 1 0 0 1-.7.3H7a1 1 0 0 1-1-1v-4a1 1 0 0 1 .3-.7zM8 16h2.59l9-9L17 4.41l-9 9V16zm10-2a1 1 0 0 1 2 0v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2h6a1 1 0 0 1 0 2H4v14h14v-6z' />
                                </svg>
                            </a>
                        </div>
                        <div className='search-box p-4 flex-none'>
                            <div className='relative'>
                                <label>
                                    <input
                                        className='rounded-full py-2 pr-6 pl-10 w-full border border-gray-800 focus:border-gray-700 bg-gray-800 focus:bg-gray-900 focus:outline-none text-gray-200 focus:shadow-md transition duration-300 ease-in'
                                        type='text'
                                        placeholder='Search Messenger'
                                        onChange={(e) => inputSearchHandle(e)}
                                    />
                                    <span className='absolute top-0 left-0 mt-2 ml-3 inline-block'>
                                        <svg viewBox='0 0 24 24' className='w-6 h-6'>
                                            <path
                                                fill='#bbb'
                                                d='M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z'
                                            />
                                        </svg>
                                    </span>
                                </label>
                            </div>
                        </div>
                        <div className='contacts p-2 flex-1 overflow-y-scroll'>
                            {userList &&
                                userList?.map((item, index) => {
                                    return (
                                        <div onClick={() => handleChatList(index)}>
                                            <ChatBox name={item?.userDetails?.name} indexKey={index} activeUserId={activeUserId} />
                                        </div>
                                    );
                                })}
                        </div>
                    </section>

                    {!chatItemData ? (
                        <div className='border-gray-800 w-full relative h-full'>
                            <div className='absolute top-1/2 flex justify-center right-0 left-0  bg-white max-w-full'>
                                <div className='absolute flex flex-col items-center'>
                                    <div className='mb-3'>
                                        <MessageFilled className='text-5xl' />
                                    </div>
                                    <div>
                                        <h1 className='font-bold text-4xl'>Chat With Web</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <section className='flex flex-col flex-auto border-l border-gray-800'>
                            <div className='chat-header px-6 py-4 flex flex-row flex-none justify-between items-center shadow'>
                                <div className='flex'>
                                    {chatItemData && (
                                        <>
                                                <div className='w-12 h-12 mr-4 relative flex flex-shrink-0'>
                                                <img
                                                        className='shadow-md rounded-full w-full h-full object-cover'
                                                        src={chatItemData?.userDetails?.profilePic}
                                                        alt=''
                                                    />
                                                </div>
                                                <div className='text-sm'>
                                                    <p className='font-bold'>
                                                        {chatItemData?.userDetails?.name}
                                                    </p>
                                                    <p>Active 1h ago</p>
                                                </div>
                                            </>
                                        )}
                                    </div>

                                    <div className='flex'>
                                        <a
                                            href='#'
                                            className='block rounded-full hover:bg-gray-700 bg-gray-800 w-10 h-10 p-2'
                                        >
                                            <svg
                                                viewBox='0 0 20 20'
                                                className='w-full h-full fill-current text-blue-500'
                                            >
                                                <path d='M11.1735916,16.8264084 C7.57463481,15.3079672 4.69203285,12.4253652 3.17359164,8.82640836 L5.29408795,6.70591205 C5.68612671,6.31387329 6,5.55641359 6,5.00922203 L6,0.990777969 C6,0.45097518 5.55237094,3.33066907e-16 5.00019251,3.33066907e-16 L1.65110039,3.33066907e-16 L1.00214643,8.96910337e-16 C0.448676237,1.13735153e-15 -1.05725384e-09,0.445916468 -7.33736e-10,1.00108627 C-7.33736e-10,1.00108627 -3.44283713e-14,1.97634814 -3.44283713e-14,3 C-3.44283713e-14,12.3888407 7.61115925,20 17,20 C18.0236519,20 18.9989137,20 18.9989137,20 C19.5517984,20 20,19.5565264 20,18.9978536 L20,18.3488996 L20,14.9998075 C20,14.4476291 19.5490248,14 19.009222,14 L14.990778,14 C14.4435864,14 13.6861267,14.3138733 13.2940879,14.7059121 L11.1735916,16.8264084 Z' />
                                            </svg>
                                        </a>
                                        <a
                                            href='#'
                                            className='block rounded-full hover:bg-gray-700 bg-gray-800 w-10 h-10 p-2 ml-4'
                                        >
                                            <svg
                                                viewBox='0 0 20 20'
                                                className='w-full h-full fill-current text-blue-500'
                                            >
                                                <path d='M0,3.99406028 C0,2.8927712 0.894513756,2 1.99406028,2 L14.0059397,2 C15.1072288,2 16,2.89451376 16,3.99406028 L16,16.0059397 C16,17.1072288 15.1054862,18 14.0059397,18 L1.99406028,18 C0.892771196,18 0,17.1054862 0,16.0059397 L0,3.99406028 Z M8,14 C10.209139,14 12,12.209139 12,10 C12,7.790861 10.209139,6 8,6 C5.790861,6 4,7.790861 4,10 C4,12.209139 5.790861,14 8,14 Z M8,12 C9.1045695,12 10,11.1045695 10,10 C10,8.8954305 9.1045695,8 8,8 C6.8954305,8 6,8.8954305 6,10 C6,11.1045695 6.8954305,12 8,12 Z M16,7 L20,3 L20,17 L16,13 L16,7 Z' />
                                            </svg>
                                        </a>
                                        <a
                                            href='#'
                                            className='block rounded-full hover:bg-gray-700 bg-gray-800 w-10 h-10 p-2 ml-4'
                                        >
                                            <svg
                                                viewBox='0 0 20 20'
                                                className='w-full h-full fill-current text-blue-500'
                                            >
                                                <path d='M2.92893219,17.0710678 C6.83417511,20.9763107 13.1658249,20.9763107 17.0710678,17.0710678 C20.9763107,13.1658249 20.9763107,6.83417511 17.0710678,2.92893219 C13.1658249,-0.976310729 6.83417511,-0.976310729 2.92893219,2.92893219 C-0.976310729,6.83417511 -0.976310729,13.1658249 2.92893219,17.0710678 Z M9,11 L9,10.5 L9,9 L11,9 L11,15 L9,15 L9,11 Z M9,5 L11,5 L11,7 L9,7 L9,5 Z' />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                                <div ref={chatBoxRef} key={1} className='chat-body p-4 flex-1 overflow-y-scroll'>
                                    {getMessage &&
                                        Object.entries(getMessage).map(([date, messageData, index]) => {
                                        return (
                                            <div key={date}>
                                                <div className='flex justify-center '>
                                                    <span className='text-center '>{date}</span>
                                                </div>
                                                {messageData?.map((item, index) => (
                                                    <Message
                                                        key={index}
                                                        text={item?.message}
                                                        senderId={item?.senderId}
                                                        image={item?.image}
                                                        time={item?.createdAt}
                                                    />
                                                ))}
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className='chat-footer flex-none'>
                                    <div className='flex flex-row items-center p-4'>
                                        <div className='relative flex-grow'>
                                            <label>
                                                <input
                                                    className='input-message rounded-full py-2 pl-3 pr-10 w-full border border-gray-800 focus:border-gray-700 bg-gray-800 focus:bg-gray-900 focus:outline-none text-gray-200 focus:shadow-md transition duration-300 ease-in'
                                                    type='text'
                                                    placeholder='Aa'
                                                    value={message}
                                                    onChange={(e) => handleMessage(e)}
                                                />
                                                <button
                                                    type='button'
                                                    className='absolute top-0 right-0 mt-2 mr-3 flex flex-shrink-0 focus:outline-none block text-blue-600 hover:text-blue-700 w-6 h-6'
                                                ></button>
                                                <div className='absolute right-2 top-2'>
                                                    <label
                                                        htmlFor='file-upload'
                                                        className='inline-block cursor-pointer rounded font-bold text-white'
                                                    >
                                                        <svg
                                                            viewBox='0 0 20 20'
                                                            className='w-7 h-7 fill-current relative'
                                                        >
                                                            <path d='M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0' />
                                                            <path d='M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54L1 12.5v-9a.5.5 0 0 1 .5-.5z' />
                                                        </svg>
                                                    </label>
                                                    <input
                                                        onChange={handleFileChange}
                                                        id='file-upload'
                                                        type='file'
                                                        className='sr-only'
                                                    />
                                                </div>
                                            </label>
                                    </div>
                                        <button
                                            type='button'
                                            onClick={sendMessage}
                                            className='flex flex-shrink-0 focus:outline-none mx-2 block text-blue-600 hover:text-blue-700 w-6 h-6'
                                        >
                                            <svg
                                                viewBox='0 0 20 20'
                                                className='w-full h-full fill-current'
                                            >
                                                <path d='M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z' />
                                            </svg>
                                        </button>
                                </div>
                                {thumbnail && (
                                        <div className='relative '>
                                            <div className='absolute bottom-[80px] right-[50px] h-fit w-fit bg-gray-800 p-3'>
                                            <img className='h-48' src={thumbnail} />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </section>
                    )}
                </main>
            </div>
        </div>
    );
};

export default demo;
