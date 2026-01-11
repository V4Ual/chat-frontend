import { useQuery } from "@tanstack/react-query";
import { fetchChatUserList } from "../service/UserService";
import { useEffect, useState } from "react";

export const useChatUserList = () => {
  const [chatUserList, setChatUserList] = useState();
  const { data, error, isLoading } = useQuery({
    queryKey: ["chat-list"],
    queryFn: fetchChatUserList,
  });

  useEffect(() => {
    if (data?.data) {
      setChatUserList(data.data);
    }
  }, [data]);

  return {
    chatUserList,
    isLoading,
  };
};
