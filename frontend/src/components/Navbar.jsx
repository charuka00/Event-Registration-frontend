import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  
  // Get user info from localStorage
  const user = JSON.parse(localStorage.getItem("user")); 

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    navigate("/"); // Redirect to Home page
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-lg font-bold">Event Registration</h1>
      <div className="space-x-4">
        <Link to="/">All Events</Link>

        {/* Admin-only link */}
        {user && user.role === "admin" && (
          <Link to="/admin-dashboard">Admin Dashboard</Link>
        )}

        {/* Profile and Logout for logged-in users */}
        {user ? (
          <>
            {user.role !== "admin" && (
              <Link to="/profile">Profile</Link> // Profile button for normal users
            )}
            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
