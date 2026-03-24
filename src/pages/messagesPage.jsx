import { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import { SearchOutlined } from "@ant-design/icons";

import MessageList from "../components/messages/messageList";
import MessageContent from "../components/messages/messageContent";
import MessageChatInfo from "../components/messages/messageChatInfo";
import MessageNav from "../components/messages/messageNav";

import "../styles/pagestyles/messagesPage.css";
import "../styles/CommonButtonStyles.css";
import "../styles/CommonStyles.css";

export default function MessagesPage() {

const [chats, setChats] = useState([]);
const [activeChat, setActiveChat] = useState(null);
const [tab, setTab] = useState("ALL");
const [search, setSearch] = useState("");

const socketRef = useRef(null);


// CONNECT TO SOCKET SERVER
useEffect(() => {
  socketRef.current = io("http://localhost:3000");

  return () => socketRef.current.close();
}, []);


// FETCH CHATS FROM BACKEND
useEffect(() => {
  fetch("/api/chats")
    .then(res => res.json())
    .then(data => {
      setChats(data);
    });
}, []);


// LISTEN FOR REAL-TIME MESSAGES
useEffect(() => {

  const socket = socketRef.current;
  if (!socket) return;

  const handleMessage = (message) => {
    setChats(prevChats =>
      prevChats.map(chat =>
        chat.id === message.chatId
          ? { ...chat, messages: [...chat.messages, message] }
          : chat
      )
    );
  };

  socket.on("receive_message", handleMessage);

  return () => socket.off("receive_message", handleMessage);

}, []);


// FILTER CHATS
const filteredChats = chats.filter(chat => {

  if (tab === "ALL") return true;
  if (tab === "MT") return chat.type === "mentor";
  if (tab === "GC") return chat.type === "group";
  if (tab === "AI") return chat.type === "ai";

  return true;

});


return (
<div className="messanger">


<div className="left-side">

      <h3>Messages</h3>

      <MessageNav tab={tab} setTab={setTab} />

      <input
        className="search"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <MessageList
        chats={filteredChats}
        openChat={setActiveChat}
      />

</div>

<div className="center">
      <MessageContent
        activeChat={activeChat}
        socket={socketRef.current}
      />
</div>

<div className="right-side">
      <MessageChatInfo
        activeChat={activeChat}
      />
</div>

</div>
);

}