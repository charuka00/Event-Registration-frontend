// frontend/src/components/Home.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Import images
import Event01 from "../assets/Event01.jpg";
import Event02 from "../assets/Event02.jpg";
import Event03 from "../assets/Event03.jpeg";
import Event04 from "../assets/Event04.jpeg";
import Event05 from "../assets/Event05.jpeg";

function Home() {
  const [events, setEvents] = useState([]);
  const [message, setMessage] = useState("");
  const [currentImage, setCurrentImage] = useState(0);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const images = [Event01, Event02, Event03, Event04, Event05];

  // Background slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  // Fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        if (!token) {
          setMessage("Please log in to view events.");
          return;
        }
        const res = await axios.get("/api/events", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEvents(res.data);
      } catch (err) {
        setMessage(
          "Failed to load events: " + (err.response?.data?.message || "Something went wrong")
        );
      }
    };
    fetchEvents();
  }, [token]);

  const handleRegister = async (eventId) => {
    setMessage("");
    try {
      if (!token) {
        setMessage("Please log in to register.");
        return;
      }
      await axios.post(
        `/api/events/${eventId}/register`,
        { userId: "user123" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("Registered successfully!");
    } catch (err) {
      setMessage(
        "Registration failed: " + (err.response?.data?.message || "Something went wrong")
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Slideshow Section */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Slide ${index}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentImage ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/20 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white text-center drop-shadow-lg">
            Welcome to the Event Registration System
          </h1>
        </div>
      </div>

      {/* Events Section */}
      <div className="container mx-auto px-4 py-8 flex-grow">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Upcoming Events
        </h2>

        {message && <p className="mb-4 text-center text-red-600">{message}</p>}

        {events.length === 0 ? (
          <p className="text-center text-gray-600">No events available yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div
                key={event._id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  {event.title}
                </h3>
                <p className="text-gray-600 mb-4">{event.description}</p>
                <p className="text-sm text-gray-500 mb-1">
                  Date: {new Date(event.date).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  Location: {event.location}
                </p>
                <button
                  onClick={() => handleRegister(event._id)}
                  className="w-full bg-blue-600 text-white p-2 rounded cursor-pointer hover:bg-blue-700"
                >
                  Register
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Event Button at the bottom */}
      <div className="w-full p-4 bg-white shadow-inner">
        <button
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
          onClick={() => navigate("/add-event")}
        >
          Add Event
        </button>
      </div>
    </div>
  );
}

export default Home;