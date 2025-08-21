// frontend/src/components/AddEvent.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddEvent() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [capacity, setCapacity] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!token) {
      setMessage("Please log in to add an event.");
      return;
    }

    try {
      const res = await axios.post(
        "/api/events",
        {
          title,
          description,
          date,
          location,
          capacity: capacity ? Number(capacity) : undefined,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage("Event added successfully!");
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to add event.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">Add Event</h2>
        <input
          type="text"
          placeholder="Title"
          className="border p-2 mb-3 rounded w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          className="border p-2 mb-3 rounded w-full"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="date"
          placeholder="Date"
          className="border p-2 mb-3 rounded w-full"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Location"
          className="border p-2 mb-3 rounded w-full"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          type="number"
          placeholder="Capacity (optional)"
          className="border p-2 mb-3 rounded w-full"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
        />
        <button className="w-full bg-blue-600 text-white p-2 rounded cursor-pointer hover:bg-blue-700">
          Submit
        </button>
        {message && <p className="mt-3 text-gray-900">{message}</p>}
      </form>
    </div>
  );
}

export default AddEvent;