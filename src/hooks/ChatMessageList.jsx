import { useQuery } from "@tanstack/react-query";
import { fetchChatMessageList } from "../service/UserService";
import { useContext, useEffect, useState } from "react";
import SocketContext from "../context/SocketContext";

export const useChatList = () => {
  const [chatMessageList, setChatMessageList] = useState();
  const [currentScreen, setCurrentScreen] = useState("chats");
  const [selectedChat, setSelectedChat] = useState(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ["chat-message", selectedChat?.roomId],
    queryFn: ({ queryKey }) => {
      const [, roomId] = queryKey;
      return fetchChatMessageList(roomId);
    },
    enabled: currentScreen === "chat" && !!selectedChat?.roomId,
  });

  useEffect(() => {
    if (data?.data) {
      setChatMessageList(data.data);
    }
  }, [data]);

  const handleSelectChat = (chat) => {
    console.log({ chat });
    setSelectedChat(chat);
    setCurrentScreen("chat");
  };

  const handleBackToChats = () => {
    setSelectedChat(null);
    setCurrentScreen("chats");
  };

  const handleOpenContacts = () => {
    setCurrentScreen("contacts");
  };

  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.emit("user::connect", {
      id: localStorage.getItem("_id"),
    });

    // return () => {
    //   socket.off("send::messsage");
    // };
  }, [socket]);

  useEffect(() => {
    socket.on("send::message", (data) => {
      console.log("_---------------", data.roomId, selectedChat);
      if (data.roomId === selectedChat?.roomId) {
        console.log({ selectedChat });
        setChatMessageList((prev) => {
          let update = [...prev, data];
          return update;
        });
      }
    });

    return () => socket.off("send::message");
  }, [selectedChat]);

  return {
    chatMessageList,
    isLoading,
    currentScreen,
    handleSelectChat,
    selectedChat,
    handleBackToChats,
    handleOpenContacts,
    setCurrentScreen,
  };
};
