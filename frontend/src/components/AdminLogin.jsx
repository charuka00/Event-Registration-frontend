import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    // Hardcoded admin check (since we only have one admin)
    if (email === "admin@gmail.com" && password === "Admin") {
      // Optionally, call backend to get JWT if needed
      // For now, we just create a fake token
      const fakeToken = "ADMIN-TOKEN";
      localStorage.setItem("adminToken", fakeToken);
      navigate("/admin-dashboard");
    } else {
      setMessage("Invalid admin credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="border p-2 mb-3 rounded w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 mb-3 rounded w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Login
        </button>
        {message && <p className="mt-3 text-red-600 text-center">{message}</p>}
      </form>
    </div>
  );
}

export default AdminLogin;
