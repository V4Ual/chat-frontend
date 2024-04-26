import { Message } from "@/component/Messaage";
import { userListHook } from "@/hooks/room";
import { searchHook } from "@/hooks/users/search.hook";
import EditFilled from "@ant-design/icons/EditFilled";
import PhoneFilled from "@ant-design/icons/PhoneFilled";
import VideoCameraFilled from "@ant-design/icons/VideoCameraFilled";
import MessageFilled from "@ant-design/icons/MessageFilled";
import CloseSquareFilled from "@ant-design/icons/CloseSquareFilled";
import SearchOutlined from "@ant-design/icons/SearchOutlined";
import { useEffect } from "react";
import { ChatItem } from "react-chat-elements";
import "react-chat-elements/dist/main.css";
import { SearchUserBox } from "@/component/SearchBoxUser";

const ChatPage = () => {
    const {
        userList,
        sendMessage,
        handleImage,
        handleChatList,
        chatList,
        chatItemData,
        message,
        image,
        handleMessage,
        setMessage,
        handleFileChange,
        thumbnail,
        inputSearchHandle
    } = userListHook();

    const {
        inputSearchOnChange,
        searchList,
        handleSearch,
        handleSearchBoxToggle,
        isShowSearchBox,
    } = searchHook();

    return (
        <>
            <div className='flex h-screen'>
                <div className='w-1/5 bg-red-500'>
                    <div className='h-32 w-full bg-blue-300'>
                        <div className='flex justify-between p-3'>
                            <h1 className='text-xl font-bold'>Chats</h1>
                            <div className='flex gap-6'>
                                <SearchOutlined onClick={() => handleSearchBoxToggle()} />
                                <EditFilled />
                            </div>
                        </div>
                        <div className='flex justify-center p-3'>
                            <input
                                type='text'
                                id='simple-search'
                                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                placeholder='Search branch name...'
                                required
                                onChange={(e) => inputSearchHandle(e)}
                            />
                        </div>
                    </div>
                    <div className='h-[calc(100%-129px)]'>
                        <div className='h-full overflow-auto p-3'>
                            {userList &&
                                userList?.map((item, index) => {
                                    return (
                                        <div
                                            key={index}
                                            onClick={() => handleChatList(index)}
                                            className='m-2 rounded-sm'
                                        >
                                            <ChatItem
                                                avatar={item?.userDetails?.profilePic}
                                                alt={"Reactjs"}
                                                title={item?.userDetails?.name}
                                                subtitle={"What are you doing?"}
                                                date={new Date()}
                                                unread={0}
                                            />
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                </div>

                {
                    !chatItemData ? (<> <div className="bg-red-200 w-full relative h-full">
                        <div className="absolute top-1/2 flex justify-center right-0 left-0  bg-white max-w-full">
                            <div className="absolute flex flex-col items-center">
                                <div className="mb-3">
                                    <MessageFilled className="text-5xl" />
                                </div>
                                <div>
                                    <h1 className="font-bold text-4xl">Chat With Web</h1>
                                </div>
                            </div>
                        </div>
                    </div></>) : (
                        <div className='flex w-full flex-col justify-between overflow-hidden bg-blue-500'>
                            <div className='bg-red-300 p-2'>
                                <div className='flex justify-between items-center'>
                                    <div className='flex justify-start gap-3 items-center'>
                                        {chatItemData && (
                                            <>
                                                <img
                                                        className='w-10 h-10 rounded-full mx-auto'
                                                        src={chatItemData?.userDetails?.profilePic}
                                                    />
                                                    <h1>{chatItemData?.userDetails?.name}</h1>
                                                </>
                                            )}
                                        </div>
                                        <div className='flex gap-3'>
                                            <PhoneFilled />
                                            <VideoCameraFilled />
                                        </div>
                                    </div>
                                </div>

                                <div className='overflow-y-reverse flex-1 overflow-auto p-2'>
                                    {chatList?.data?.map((item, index) => {
                                        return (
                                            <Message
                                                key={index}
                                                senderId={item.senderId}
                                                text={item.message}
                                                image={item?.image}
                                            // onClickDownload={() => handleDownload()}
                                            />
                                        );
                                    })}
                                </div>

                                <div className='bottom-2'>
                                    <div className='relative'>
                                        <input
                                            value={message}
                                            onChange={(e) => handleMessage(e)}
                                            placeholder='Type something ...'
                                            className='h-8 w-full p-2 rounded mb-1'
                                            type='text'
                                        />
                                        <button
                                            onClick={sendMessage}
                                            className='text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 absolute right-0 top-1/2 h-full -translate-y-1/2 bg-red-300'
                                        >
                                            send
                                        </button>
                                        <div className='absolute right-20 top-1'>
                                            <label
                                                htmlFor='file-upload'
                                                className='inline-block cursor-pointer rounded bg-blue-500 font-bold text-white'
                                            >
                                                Choose File
                                            </label>
                                            <input
                                                onChange={handleFileChange}
                                                id='file-upload'
                                                type='file'
                                                className='sr-only'
                                            />
                                        </div>
                                    </div>
                                </div>
                                {thumbnail && (
                                    <div className='relative'>
                                        <div className='absolute bottom-10 right-6 h-fit w-fit bg-green-600 p-3'>
                                            <img className='h-48' src={thumbnail} />
                                        </div>
                                    </div>
                                )}
                            </div>

                    )
                }





            </div>

            {
                isShowSearchBox && <div className="w-1/2 h-1/2 top-0 right-0 translate-y-2/4 -translate-x-2/4 bg-red-300 absolute">
                    <SearchUserBox inputSearchOnChange={inputSearchOnChange} handleSearchBoxToggle={() => handleSearchBoxToggle()} searchList={searchList} isShowSearchBox={() => isShowSearchBox()} />
                </div>
            }


        </>
    );
};

export default ChatPage;
