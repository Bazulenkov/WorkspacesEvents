import { useEffect, useState } from "react";

const Notifications = ({ workspaceId, token }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!token) return;
    const fetchNotifications = async () => {
      const response = await fetch(`http://localhost:8000/workspaces/${workspaceId}/notifications`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setNotifications(data);
    };

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 5000);
    return () => clearInterval(interval);
  }, [workspaceId, token]);

  return (
    <div className="p-4 border rounded w-80 mt-4">
      <h2 className="text-lg font-bold">Notifications</h2>
      <div className="h-40 overflow-y-auto border p-2">
        {notifications.map((notif, index) => (
          <div key={index} className="p-1 border-b">{notif.content}</div>
        ))}
      </div>
    </div>
  );
};

export { Notifications };