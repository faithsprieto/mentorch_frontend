import MessageNav from "./messageNav";

export default function MessageList({
  chats,
  openChat,
  tab,
  setTab,
  search,
  setSearch,
  activeChat
}) {
  return (
    <div className="chat-list">

      {chats.map(chat => (
        <div
          key={chat.id}
          className={`chat-card ${activeChat?.id === chat.id ? "active" : ""}`}
          onClick={() => openChat(chat)}
        >
          <img
            src={chat.avatar || "/default.jpg"}
            className="chat-avatar"
          />

          <div className="card-info">
            <h4>{chat.name}</h4>
            <p>
              {chat.messages?.[chat.messages.length - 1]?.message || "No messages"}
            </p>
          </div>
        </div>
      ))}

    </div>
  );
}