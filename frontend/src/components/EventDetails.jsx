// src/components/EventDetails.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function EventDetails() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [message, setMessage] = useState("");
  const [showBooking, setShowBooking] = useState(false);
  const [bookingData, setBookingData] = useState({
    fullName: "",
    idCard: "",
    tickets: 1,
    price: 1000,
  });

  const token = localStorage.getItem("token");

  // Fetch event details
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        if (!token) {
          setMessage("Please log in to view event details.");
          return;
        }

        const res = await axios.get(`http://localhost:3000/api/events/${eventId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setEvent(res.data);
      } catch (err) {
        setMessage(
          "Failed to load event: " +
            (err.response?.data?.message || "Something went wrong")
        );
      }
    };

    fetchEvent();
  }, [eventId, token]);

  // Handle input changes in booking form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle booking submission
  const handleBookTicket = async () => {
    try {
      if (!token) {
        setMessage("Please log in to book tickets.");
        return;
      }

      await axios.post(
        `http://localhost:3000/api/events/${eventId}/book`,
        bookingData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage("Booking Successful!");
      setShowBooking(false);
      // Clear form
      setBookingData({
        fullName: "",
        idCard: "",
        tickets: 1,
        price: 1000,
      });
    } catch (err) {
      setMessage(
        "Booking failed: " + (err.response?.data?.message || "Something went wrong")
      );
    }
  };

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-900 to-pink-800">
        {message ? (
          <p className="text-red-600 text-lg">{message}</p>
        ) : (
          <p className="text-white text-lg">Loading event details...</p>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-900 to-pink-800 px-4 py-6">
      <div className="bg-gray-900 text-white p-8 rounded-lg shadow-lg w-full max-w-2xl transform transition-all duration-300 hover:shadow-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center">{event.title}</h1>
        <p className="text-gray-300 mb-4">{event.description || "No description provided."}</p>
        <div className="space-y-2 text-gray-400">
          <p>
            <span className="font-medium text-gray-200">Date:</span>{" "}
            {new Date(event.date).toLocaleDateString()}
          </p>
          <p>
            <span className="font-medium text-gray-200">Location:</span>{" "}
            {event.location || "Not specified"}
          </p>
          <p>
            <span className="font-medium text-gray-200">Capacity:</span>{" "}
            {event.capacity || "Not specified"}
          </p>
        </div>

        <button
          onClick={() => setShowBooking(true)}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition duration-300"
        >
          Book Ticket
        </button>

        {message && <p className="mt-4 text-green-500 text-center">{message}</p>}
      </div>

      {/* Booking Modal */}
      {showBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white text-gray-900 p-6 rounded-lg w-full max-w-md shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">Book Ticket</h2>
            <div className="space-y-3">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={bookingData.fullName}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded"
              />
              <input
                type="text"
                name="idCard"
                placeholder="ID Card Number"
                value={bookingData.idCard}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded"
              />
              <input
                type="number"
                name="tickets"
                min="1"
                value={bookingData.tickets}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded"
              />
              <select
                name="price"
                value={bookingData.price}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded"
              >
                <option value={1000}>Rs.1000</option>
                <option value={2000}>Rs.2000</option>
                <option value={5000}>Rs.5000</option>
              </select>
            </div>

            <div className="mt-4 flex justify-end space-x-3">
              <button
                onClick={() => setShowBooking(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleBookTicket}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Book Ticket
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EventDetails;
