import { useEffect, useState } from "react";
import { fetchUserList } from "../service/UserService";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";

export const useUserList = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["user-list"],
    queryFn: fetchUserList,
  });
  const [userList, setUserList] = useState();

  useEffect(() => {
    if (data?.data) {
      setUserList(data.data);
    }
  }, [data]);

  return {
    userList,
    isLoading,
  };
};
