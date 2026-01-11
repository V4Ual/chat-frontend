import { useEffect, useState } from "react";
import { fetchRequestList, fetchUserList } from "../service/UserService";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";

export const useRequestList = () => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["request-list"],
    queryFn: fetchRequestList,
  });
  const [userRequestList, setUserRequestList] = useState();

  useEffect(() => {
    if (data?.data) {
      setUserRequestList(data.data);
    }
  }, [data, refetch]);

  return {
    isLoading,
    userRequestList,
    refetch,
  };
};
