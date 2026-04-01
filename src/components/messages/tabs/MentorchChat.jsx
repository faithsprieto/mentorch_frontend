export default function MentorchChat({ chats, openChat }) {
  const mentorChats = chats.filter(chat => chat.type === "mentor");

  return (
    <>
      {mentorChats.map(chat => (
        <div key={chat.id} onClick={() => openChat(chat)}>
          {chat.name}
        </div>
      ))}
    </>
  );
}