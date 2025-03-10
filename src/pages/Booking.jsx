import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BookVehicle = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState({ startDate: "", endDate: "" });
  const [error, setError] = useState("");

  const handleBooking = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/bookings`,
        {
          vehicleId: id,
          startDate: booking.startDate,
          endDate: booking.endDate,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      alert("Booking successful!");
    } catch (err) {
      setError(err.response?.data?.message || "Booking failed.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold">Book Vehicle</h2>
      {error && <p className="text-red-500">{error}</p>}
      <input
        type="date"
        onChange={(e) => setBooking({ ...booking, startDate: e.target.value })}
        className="input"
      />
      <input
        type="date"
        onChange={(e) => setBooking({ ...booking, endDate: e.target.value })}
        className="input"
      />
      <button className="btn mt-4" onClick={handleBooking}>
        Confirm Booking
      </button>
    </div>
  );
};

export default BookVehicle;
