export default function AllChat({ chats, openChat }) {
  return (
    <>
      {chats.map(chat => (
        <div key={chat.id} onClick={() => openChat(chat)}>
          {chat.name}
        </div>
      ))}
    </>
  );
}