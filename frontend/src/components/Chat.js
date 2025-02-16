import { useEffect, useState } from "react";

const Chat = ({ eventId, token }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [ws, setWs] = useState(null);

  useEffect(() => {
    if (!token) return;
    const socket = new WebSocket(`ws://localhost:8000/chat/ws/${eventId}?token=${token}`);
    setWs(socket);

    socket.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]);
    };

    return () => socket.close();
  }, [eventId, token]);

  const sendMessage = () => {
    if (ws && message.trim() !== "") {
      ws.send(message);
      setMessage("");
    }
  };

  return (
    <div className="p-4 border rounded w-80">
      <h2 className="text-lg font-bold">Chat</h2>
      <div className="h-40 overflow-y-auto border p-2 mb-2">
        {messages.map((msg, index) => (
          <div key={index} className="p-1 border-b">{msg}</div>
        ))}
      </div>
      <input
        className="border p-1 w-full"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage} className="mt-2 bg-blue-500 text-white p-1 rounded w-full">
        Send
      </button>
    </div>
  );
};

export { Chat };