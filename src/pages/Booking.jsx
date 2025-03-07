import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Booking = () => {
  const { vehicleId } = useParams();
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleBooking = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must log in first.");
      return;
    }

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/bookings`,
        { vehicleId, startDate, endDate },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSuccess("Booking Successful!");
      setTimeout(() => navigate(`/payment/${data.bookingId}`), 1500);
    } catch {
      setError("Booking failed. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Book Vehicle</h1>

      <div className="mt-4">
        <label className="block">Start Date:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border p-2 rounded"
        />

        <label className="block mt-2">End Date:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border p-2 rounded"
        />
      </div>

      <button
        onClick={handleBooking}
        className="bg-blue-500 text-white p-2 rounded mt-4"
      >
        Book Now
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}
      {success && <p className="text-green-500 mt-2">{success}</p>}
    </div>
  );
};

export default Booking;
