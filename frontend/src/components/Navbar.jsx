// frontend/src/components/Navbar.jsx
import { Link } from "react-router-dom";

function Navbar() {
  const token = localStorage.getItem("token");

  return (
    <nav className="bg-blue-600 p-4 text-white shadow-md">
      <ul className="flex space-x-6 justify-center">
        <li><Link to="/" className="hover:text-blue-200">All Events</Link></li>
        {token && <Link to="/admin-dashboard" className="hover:text-blue-200">Admin Dashboard</Link>} 
        <li><Link to="/admin-login" className="hover:text-blue-200">Admin Login</Link></li>
        <li><Link to="/login" className="hover:text-blue-200">Login</Link></li>
        <li><Link to="/register" className="hover:text-blue-200">Register</Link></li>
        <li><Link to="/profile" className="hover:text-blue-200">Profile</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;