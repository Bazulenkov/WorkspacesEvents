import { useState } from "react";

const Login = ({ setToken, setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    const response = await fetch("http://localhost:8000/auth/jwt/login", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ username: email, password: password }),
    });

    const data = await response.json();
    if (response.ok) {
      setToken(data.access_token);
      localStorage.setItem("token", data.access_token);
      fetchUserData(data.access_token);
    } else {
      setError(data.detail || "Login failed");
    }
  };

  const fetchUserData = async (token) => {
    const response = await fetch("http://localhost:8000/users/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.ok) {
      const userData = await response.json();
      setUser(userData.email);
      localStorage.setItem("user", userData.email);
    }
  };

  return (
    <div className="p-4 border rounded w-80">
      <h2 className="text-lg font-bold">Login</h2>
      {error && <p className="text-red-500">{error}</p>}
      <input
        className="border p-1 w-full mb-2"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="border p-1 w-full mb-2"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin} className="bg-blue-500 text-white p-1 rounded w-full">
        Login
      </button>
    </div>
  );
};

export { Login };