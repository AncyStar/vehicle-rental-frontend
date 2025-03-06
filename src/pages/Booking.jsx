import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Booking = () => {
  const { id } = useParams(); // Vehicle ID from URL
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [unavailableDates, setUnavailableDates] = useState([]);
  const [error, setError] = useState("");

  // Fetch Vehicle Details & Unavailable Dates
  useEffect(() => {
    axios
      .get(`${backendUrl}/api/vehicles/${id}`)
      .then((res) => setVehicle(res.data))
      .catch(() => setError("Vehicle not found"));

    axios
      .get(`${backendUrl}/api/bookings/availability/${id}`)
      .then((res) => setUnavailableDates(res.data.unavailableDates))
      .catch(() => console.log("Error fetching unavailable dates"));
  }, [id]);

  //  Handle Booking Submission
  const handleBooking = async () => {
    setError(""); // Clear previous errors

    if (!startDate || !endDate) {
      setError("Please select both start and end dates.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must log in first.");
      return;
    }

    try {
      const response = await axios.post(
        `${backendUrl}/api/bookings`,
        {
          vehicleId: id,
          startDate,
          endDate,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const bookingId = response.data.bookingId || response.data.booking?._id;

      if (!bookingId) {
        throw new Error("Invalid booking data received");
      }

      localStorage.setItem("bookingId", bookingId);
      console.log("Booking ID Stored:", bookingId);
      navigate(`/payment/${bookingId}`);
    } catch (error) {
      console.error("Booking failed:", error.response?.data || error.message);
      setError(
        error.response?.data?.message || "Booking failed. Please try again."
      );
    }
  };

  if (error) return <p className="text-red-500">{error}</p>;
  if (!vehicle) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">
        Book {vehicle.make} {vehicle.model}
      </h1>
      <p>Price per day: ${vehicle.pricePerDay}</p>

      {/* Show Unavailable Dates */}
      <h3 className="text-lg font-semibold mt-4">Unavailable Dates:</h3>
      <ul>
        {unavailableDates.length > 0 ? (
          unavailableDates.map((date, index) => (
            <li key={index} className="text-red-500">
              {new Date(date.start).toLocaleDateString()} -{" "}
              {new Date(date.end).toLocaleDateString()}
            </li>
          ))
        ) : (
          <p>No unavailable dates</p>
        )}
      </ul>

      <label className="block mt-4">Start Date:</label>
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="border p-2 w-full"
        required
      />

      <label className="block mt-4">End Date:</label>
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="border p-2 w-full"
        required
      />

      <button
        onClick={handleBooking}
        className="bg-blue-500 text-white p-2 rounded mt-4"
      >
        Book Now
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default Booking;
