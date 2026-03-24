export default function MessageBubble({ message }) {
  return (
    <div className={`message ${message.type}`}>
      {message.text}
    </div>
  );
}