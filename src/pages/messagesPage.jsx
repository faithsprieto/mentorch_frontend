import { useEffect, useState, useRef } from "react";
import io from "socket.io-client";

import MessageContent from "../components/messages/messageContent";
import MessageChatInfo from "../components/messages/messageChatInfo";
import MessageNav from "../components/messages/messageNav";

// ✅ IMPORT TAB COMPONENTS
import AllChat from "../components/messages/tabs/AllChat";
import MentorchChat from "../components/messages/tabs/MentorchChat";
import GroupChat from "../components/messages/tabs/GroupChat";
import AIChat from "../components/messages/tabs/AIChat";

import "../styles/pagestyles/messagesPage.css";
import "../styles/CommonButtonStyles.css";
import "../styles/CommonStyles.css";

export default function MessagesPage() {

  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [tab, setTab] = useState("ALL");
  const [search, setSearch] = useState("");

  const socketRef = useRef(null);

  // CONNECT TO SOCKET
  useEffect(() => {
    socketRef.current = io("http://localhost:3000");
    return () => socketRef.current.close();
  }, []);

  // FETCH CHATS
  useEffect(() => {
    fetch("/api/chats")
      .then(res => res.json())
      .then(data => setChats(data));
  }, []);

  // REAL-TIME LISTENER
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

  return (
    <div className="messanger">

      {/* LEFT SIDE */}
      <div className="left-side">

        <h3>Messages</h3>

        <MessageNav tab={tab} setTab={setTab} />

        <input
          className="search"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* 🔥 TAB SWITCHING (LIKE DASHBOARD) */}
        {tab === "ALL" && (
          <AllChat chats={chats} openChat={setActiveChat} />
        )}

        {tab === "MT" && (
          <MentorchChat chats={chats} openChat={setActiveChat} />
        )}

        {tab === "GC" && (
          <GroupChat chats={chats} openChat={setActiveChat} />
        )}

        {tab === "AI" && (
          <AIChat chats={chats} openChat={setActiveChat} />
        )}

      </div>

      {/* CENTER */}
      <div className="center">
        <MessageContent
          activeChat={activeChat}
          socket={socketRef.current}
        />
      </div>

      {/* RIGHT */}
      <div className="right-side">
        <MessageChatInfo activeChat={activeChat} />
      </div>

    </div>
  );
}