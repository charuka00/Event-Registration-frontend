// frontend/src/components/AdminDashboard.jsx
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  const handleAddEvent = () => {
    navigate("/add-event");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-100 p-4 relative">
      {/* Admin Dashboard sentence at the top */}
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Add Event button in top right corner */}
      <button
        onClick={handleAddEvent}
        className="absolute top-4 right-4 bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
      >
        Add Event
      </button>

      {/* Optional: Add content here (e.g., events list) */}
      <p className="mt-4">Welcome to the Admin Dashboard. Manage your events here.</p>
    </div>
  );
}

export default AdminDashboard;