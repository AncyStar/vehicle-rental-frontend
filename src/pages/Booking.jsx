import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Booking = () => {
  const { vehicleId } = useParams();
  const [unavailableDates, setUnavailableDates] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`${backendUrl}/api/bookings/availability/${vehicleId}`)
      .then((res) => {
        setUnavailableDates(res.data.unavailableDates);
      })
      .catch((err) => {
        console.error(
          "Error fetching available dates:",
          err.response?.data || err.message
        );
      });
  }, [vehicleId]);

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
      console.log("Booking Response:", data);
      alert("Booking Successful!");
    } catch (error) {
      console.error("Booking failed:", error.response?.data || error.message);
      setError("Booking failed. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Book Vehicle</h1>

      <h2 className="mt-4 font-semibold">Unavailable Dates:</h2>
      <ul>
        {unavailableDates.map((date, index) => (
          <li key={index}>
            {date.start.split("T")[0]} to {date.end.split("T")[0]}
          </li>
        ))}
      </ul>

      <label>Start Date:</label>
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />

      <label>End Date:</label>
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />

      <button
        onClick={handleBooking}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Book Now
      </button>

      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default Booking;
