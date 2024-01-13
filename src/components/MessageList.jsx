/* eslint-disable react/prop-types */
// import React from 'react'
import { useRef, useEffect } from "react";
const MessageList = ({ messages }) => {
  const messageContainerRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom when messages change
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages]);
  return (
    <div ref={messageContainerRef}  className="flex-shrink   after:text-red-500    flex-col flex-grow overflow-y-scroll   display: none; ">
      {messages.map((message, index) => (
        // eslint-disable-next-line react/jsx-key

        // eslint-disable-next-line react/jsx-key
        <div key={index} className={`flex ${message.senderId === "65a0b7566508f35daca70e0d" ? "justify-end" : "justify-start"} p-1`}>
          <div className="flex-shrink-0">
            <img className="w-10 h-10 rounded-full mr-2" src={'https://api.slingacademy.com/public/sample-photos/1.jpeg'} />
          </div>
          <div className={`${message.senderId === "65a0b76a6508f35daca70e10" ? "bg-blue-500 text-white" : "bg-gray-300 text-black"}break-words p-2 rounded-md  whitespace-normal overflow-auto overflow-y-auto`}>
            
            <p className="break-words">{message.message}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
