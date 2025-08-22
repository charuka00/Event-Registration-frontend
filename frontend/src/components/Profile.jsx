import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-900 to-pink-800">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-900 to-pink-800 px-4">
      <div className="bg-gray-900 text-white p-8 rounded-lg shadow-lg max-w-2xl w-full transform transition-all duration-300 hover:shadow-2xl">
        <h2 className="text-3xl font-bold mb-6 text-center">My Profile</h2>
        {message ? (
          <p className="text-gray-300 text-center">{message}</p>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between">
              <p className="text-gray-300">First Name:</p>
              <p className="font-medium">{user.firstName || "N/A"}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-300">Last Name:</p>
              <p className="font-medium">{user.lastName || "N/A"}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-300">Email:</p>
              <p className="font-medium">{user.email || "N/A"}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-300">Role:</p>
              <p className="font-medium">{user.role || "N/A"}</p>
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <Link
                to="/edit-profile"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-300"
              >
                Edit Profile
              </Link>
              <Link
                to="/change-password"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition duration-300"
              >
                Change Password
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
