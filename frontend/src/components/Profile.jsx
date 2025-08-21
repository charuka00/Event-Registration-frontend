// src/components/Profile.jsx
import { useState, useEffect } from "react";
import axios from "axios";

function Profile() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("Please log in to view your profile.");
        return;
      }

      try {
        const res = await axios.get("/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        setMessage(err.response?.data?.message || "Failed to load profile.");
      }
    };

    fetchProfile();
  }, []);

  if (!user && !message) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-sm text-center">
        <h2 className="text-2xl font-bold mb-4">Profile</h2>
        {message ? (
          <p className="text-gray-600">{message}</p>
        ) : (
          <div>
            <p className="text-gray-600">First Name: {user.firstName}</p>
            <p className="text-gray-600">Last Name: {user.lastName}</p>
            <p className="text-gray-600">Email: {user.email}</p>
            <p className="text-gray-600">Role: {user.role}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
