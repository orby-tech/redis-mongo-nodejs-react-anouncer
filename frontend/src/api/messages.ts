import { baseApiUrl } from "../config.ts";
import { Message } from "../types/messages.ts";

export const sendNewMessage = (newMessage: Message["text"]) => {
  return fetch(`${baseApiUrl}/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: newMessage }),
  });
};

export const fetchMessages = async (): Promise<Message[]> => {
  const response = await fetch(`${baseApiUrl}/messages`);
  return response.json();
};
