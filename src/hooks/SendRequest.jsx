import { useMutation } from "@tanstack/react-query";
import {
  fetchAccept,
  fetchDecline,
  fetchRequestSend,
} from "../service/UserService";

export const useSendRequest = (refetch) => {
  const { mutate, isPending } = useMutation({
    mutationFn: fetchRequestSend,
  });

  const acceptRequestMetate = useMutation({ mutationFn: fetchAccept });
  const declineRequestMetate = useMutation({ mutationFn: fetchDecline });

  const sendRequest = async (receiveUser) => {
    await mutate({
      reciverId: receiveUser.id,
    });
  };

  const acceptRequest = async (receiveUser) => {
    await acceptRequestMetate.mutate(receiveUser.requestId);
    refetch();
  };

  const declineRequest = async (receiveUser) => {
    declineRequestMetate.mutate(receiveUser.requestId);
    refetch();
  };

  return {
    sendRequest,
    isPending,
    acceptRequest,
    declineRequest,
  };
};
