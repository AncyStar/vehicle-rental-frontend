import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [unavailableDates, setUnavailableDates] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`${backendUrl}/api/vehicles/${id}`)
      .then((res) => setVehicle(res.data))
      .catch(() => setError("Vehicle not found"));

    axios
      .get(`${backendUrl}/api/bookings/availability/${id}`)
      .then((res) => setUnavailableDates(res.data.unavailableDates))
      .catch(() => console.error("Error fetching unavailable dates"));
  }, [id]);

  const handleBooking = async () => {
    if (!startDate || !endDate) {
      setError("Please select both start and end dates.");
      return;
    }

    // Check if selected dates conflict with unavailable dates
    const start = new Date(startDate);
    const end = new Date(endDate);
    for (let date of unavailableDates) {
      const bookedStart = new Date(date.start);
      const bookedEnd = new Date(date.end);
      if (start < bookedEnd && end > bookedStart) {
        setError(
          "Selected dates are not available. Please choose another range."
        );
        return;
      }
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must log in first.");
      return;
    }

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/bookings`,
        { vehicleId: id, startDate, endDate },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Booking Created:", data);
      navigate(`/payment/${data.booking._id}`);
    } catch (error) {
      console.error("Booking failed:", error.response?.data || error.message);
      setError(
        error.response?.data?.message || "Booking failed. Please try again."
      );
    }
  };

  return (
    <div>
      <h1>
        Book {vehicle?.make} {vehicle?.model}
      </h1>
      <p>
        <strong>Unavailable Dates:</strong>{" "}
        {unavailableDates.map((d) => `${d.start} - ${d.end}`).join(", ")}
      </p>

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

      <button onClick={handleBooking}>Book Now</button>

      {error && <p>{error}</p>}
    </div>
  );
};

export default Booking;
