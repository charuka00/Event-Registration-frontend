import React from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  // Logout function
  const handleLogout = () => {
    // Remove stored auth data
    localStorage.removeItem("token"); 
    localStorage.removeItem("user");

    // Redirect to Home Page
    navigate("/");  // Make sure "/" is your home route
  };

  // Navigate to Add Event page
  const handleAddEvent = () => {
    navigate("/add-event"); // Make sure this route exists
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Header with Logout & Add Event Button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>

        {/* Buttons Container */}
        <div className="flex gap-4">
          <button
            onClick={handleAddEvent}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Add Event
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Dashboard Content */}
      <p className="text-gray-700">
        Welcome, Admin! From here you can manage events, users, and more.
      </p>
    </div>
  );
}

export default AdminDashboard;
