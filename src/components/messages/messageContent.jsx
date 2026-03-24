import { useState } from "react";
import MessageBubble from "./messageBubble";
import { PlusOutlined } from "@ant-design/icons";

export default function MessageContent({ activeChat, socket }) {

  const [text, setText] = useState("");

  const sendMessage = () => {

    if (!text || !activeChat) return;

    const message = {
      chatId: activeChat.id,
      text: text,
      type: "sent"
    };

    socket.emit("send_message", message);

    setText("");
  };

  return (
    <main className="chat-window">

      <div className="chat-header">
        <h3>
          {activeChat ? activeChat.name : "Select a chat"}
        </h3>
      </div>

      <div className="messages">
        {activeChat &&
            activeChat?.messages?.map((msg, index) => (
            <MessageBubble key={index} message={msg} />
        ))}

      </div>

      <div className="chat-input">
        
        <button onClick={sendMessage}>
          <PlusOutlined />
        </button>

        <input
          type="text"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
          if (e.key === "Enter") sendMessage();
          }}
        />

        <button onClick={sendMessage}>
          Send
        </button>

      </div>

    </main>
  );
}