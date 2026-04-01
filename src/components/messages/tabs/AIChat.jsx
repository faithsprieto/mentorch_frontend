export default function AIChat({ chats, openChat }) {
  const aiChats = chats.filter(chat => chat.type === "ai");

  return (
    <>
      {aiChats.map(chat => (
        <div key={chat.id} onClick={() => openChat(chat)}>
          {chat.name}
        </div>
      ))}
    </>
  );
}