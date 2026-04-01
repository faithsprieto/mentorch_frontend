export default function GroupChat({ chats, openChat }) {
  const groupChats = chats.filter(chat => chat.type === "group");

  return (
    <>
      {groupChats.map(chat => (
        <div key={chat.id} onClick={() => openChat(chat)}>
          {chat.name}
        </div>
      ))}
    </>
  );
}