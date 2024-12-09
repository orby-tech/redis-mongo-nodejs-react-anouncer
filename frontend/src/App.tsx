import React, { useState } from "react";

import { useMessages } from "./hooks/messages.ts";
import { sendNewMessage } from "./api/messages.ts";

const App: React.FC = () => {
  const [newMessage, setNewMessage] = useState("");
  const { messages, isLoading } = useMessages();

  const sendMessage = async () => {
    await sendNewMessage(newMessage);
    setNewMessage("");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Messages</h1>
      <ul>
        {messages &&
          messages.map((message) => <li key={message._id}>{message.text}</li>)}
      </ul>
      <input
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type a new message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default App;
