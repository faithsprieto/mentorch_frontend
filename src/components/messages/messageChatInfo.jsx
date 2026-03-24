export default function MessageChatInfo({ activeChat }) {

  return (
    <div className="chat-info">

      <h3>Chat Info</h3>

      {activeChat ? (
        <>
          <p>Name: {activeChat.name}</p>
          <p>Total Messages: {activeChat.messages.length}</p>
        </>
      ) : (
        <p>No chat selected</p>
      )}

    </div>
  );
}