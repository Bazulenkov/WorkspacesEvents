import { useState } from "react";
import { Login } from "./components/Login";
import { Chat } from "./components/Chat";
import { Notifications } from "./components/Notifications";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(localStorage.getItem("user") || "");

  const handleLogout = () => {
    setToken("");
    setUser("");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <div className="p-4 flex flex-col items-center gap-4">
      {!token ? (
        <Login setToken={setToken} setUser={setUser} />
      ) : (
        <>
          <div className="text-lg font-bold">Welcome, {user}</div>
          <button onClick={handleLogout} className="bg-red-500 text-white p-1 rounded w-80">
            Logout
          </button>
          <Chat eventId={1} token={token} />
          <Notifications workspaceId={1} token={token} />
        </>
      )}
    </div>
  );
};

export default App;