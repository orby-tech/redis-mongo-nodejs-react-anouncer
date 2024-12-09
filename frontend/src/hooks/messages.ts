import { useMessagesQuery } from "../queries/messages.ts";
import { baseWsUrl } from "../config.ts";
import useWebSocket from "react-use-websocket";

export const useMessages = () => {
  const { isLoading, messages, addNewMessage } = useMessagesQuery();

  useWebSocket(baseWsUrl, {
    onOpen: () => console.log("opened"),
    shouldReconnect: (closeEvent) => true,
    onMessage: (event: WebSocketEventMap["message"]) => {
      const eventData = JSON.parse(event.data);
      console.info("Received message:", eventData);
      if (eventData.type === "new_message") {
        addNewMessage(eventData.data);
      }
    },
  });

  return { messages, isLoading };
};
