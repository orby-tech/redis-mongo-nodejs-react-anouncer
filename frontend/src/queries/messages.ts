import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Message } from "../types/messages.ts";
import { fetchMessages } from "../api/messages.ts";

export const useMessagesQuery = () => {
  const queryClient = useQueryClient();

  const { data: messages, isLoading } = useQuery({
    queryKey: ["messages"],
    queryFn: fetchMessages,
  });

  const addNewMessage = (newMessage: Message) => {
    queryClient.setQueryData<Message[]>(["messages"], (old) =>
      old ? [...old, newMessage] : [newMessage]
    );
  };

  return { messages, isLoading, addNewMessage };
};
