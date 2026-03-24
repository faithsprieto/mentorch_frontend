export default function MessageCard({ chat, openChat }) {

  return (
    <div
      className="chat-card"
      onClick={() => openChat(chat)}
    >
      <img
        src="/profile-placeholder.png"
        alt="profile"
        className="chat-avatar"
      />

      <div className="chat-info">
        <h4>{chat.name}</h4>
        <p>{chat.preview}</p>
      </div>
    </div>
  );
}