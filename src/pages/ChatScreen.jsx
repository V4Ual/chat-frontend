import { useEffect, useState } from "react";
import UserProfile from "../components/UserProfile";
import MessageList from "../components/MessageList";
//import axiosApi from "../services/AxiosServer";
import { useSocket } from "../services/SocketProvicer";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchChatMessage, fetchUserFromRoom } from "../services/AxiosServer";
import { getTokenForLocalStorage } from "../service/extraServices";
import { useNavigate } from "react-router-dom";

const ChatScreen = () => {

  let socket = useSocket()
  const navigate = useNavigate()



  const [user, setUser] = useState();
  const [messages, setMessages] = useState();

  const [newMessages, setNewMessage] = useState("");
  const [open, setOpen] = useState("");

  const handleSendMessage = () => {
    const newMessage = { id: messages.length + 1, message: newMessages, sender: "65a0b7566508f35daca70e0d" };
    setMessages([...messages, newMessage]);
    setNewMessage("");
  };

  const fetchUser = async () => {
    const data = await axios.get("http://localhost:3001/api/v1/room/user-list/659ec1e01c8d46a7d2c93dc3");
    // console.log(data);
    if (data.status == 200) {
      console.log(data.data.data);
      setUser(data.data.data);
    }
  };
  const fetchChat = async () => {
    const data = await axios.get("http://localhost:3001/api/v1/chat/65a0b7f5afcb403aff55e7a6");
    // console.log(data);
    if (data.status == 200) {
      console.log(data.data.data);
      setMessages(data.data.data);
    }
  };

  const fetchDetails = async () => {
    const _id = await getTokenForLocalStorage('_id')
    console.log(_id);
    if (_id) {
      const chatMessage = await fetchChatMessage(_id)
      const fetchUserRoom = await fetchUserFromRoom(_id)
      console.log(chatMessage, fetchUserRoom);
      setMessages(chatMessage)
      setUser(fetchUserRoom)

    } else {
      navigate('/')
    }
  }

  useEffect(() => {
    // socket.emit('send:message',"vishla")
    // fetchUser();
    // fetchChat();
    fetchDetails()
  }, []);

  const handleClick = (data) => {
    console.log("data---------", data);
    toast.success('ellfldsflsd')
    setMessages("");
  }




  return (
    <>
      <button
        type="button"
        className="text-white absolute justify-center items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        onClick={() => open == true ? setOpen(false) : setOpen(true)}
        // onClick={useThrottle}
      >
        Default
      </button>{" "}
      <div className="flex flex-col lg:flex-row justify-center items-center lg:space-x-8">
        <div
          className={`container mx-auto  items-center justify-center ring-offset-2 border-r-8  ${open == true ? "" : "hidden"}  ring-2 bg-red-500 h-[50%] w-[50%] absolute overflow-hidden  overflow-y-auto`}
        >
          <div className="fixed w-[50%]">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path stroke="currentColor" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Mockups, Logos..."
              required
            />
            <button
              type="submit"
              className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
          <form id="searchForm">
            <div className="user-list-container mt-4  overflow-y-auto">
              {/* {user && user.map((user, index) => <UserProfile key={index} {...user} onClick={handler} />)} */}
            </div>
          </form>
        </div>
        <div className="bg-indigo-500 lg:w-[20%] h-screen w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 overflow-y-auto">
          <div className="flow-root">
            <ul role="list" className="divide-y pt-7 divide-gray-200 dark:divide-gray-700">
              {
                user && user?.map((uItem, uInedx) => {
                  return (
                    <UserProfile
                      key={uInedx}
                      uItem={uItem}
                      handleClick={handleClick}
                    />
                  )
                })
              }
            </ul>
          </div>
        </div>

        <div className="bg-indigo-400 lg:w-[80%] h-screen flex flex-col justify-end p-4">
          {messages && < MessageList key={messages.length + 1} messages={messages} />}
          <div className="flex mt-4 ">
            <input
              type="text"
              placeholder="Type your message..."
              value={newMessages}
              className="flex-1 border p-2 rounded-l-md"
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button onClick={handleSendMessage} className="bg-blue-500 text-white p-2 rounded-r-md">
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatScreen;
