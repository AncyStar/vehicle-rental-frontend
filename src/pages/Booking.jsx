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
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`${backendUrl}/api/vehicles/${id}`)
      .then((res) => setVehicle(res.data))
      .catch(() => setError("Vehicle not found"));
  }, [id]);

  const handleBooking = async () => {
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
      const { data } = await axios.post(
        `${backendUrl}/api/bookings`,
        { vehicleId: id, startDate, endDate },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Check if booking ID exists before storing it
      if (!data.booking || !data.booking._id) {
        setError("Booking failed: Invalid response from server.");
        return;
      }

      localStorage.setItem("bookingId", data.booking._id);

      console.log("Booking Created:", data);
      navigate(`/payment/${data.booking._id}`); //Redirect after successful booking
    } catch {
      setError("Booking failed. Please try again.");
    }
  };

  if (!vehicle) return <p>Loading...</p>;

  return (
    <div>
      <h1>
        Book {vehicle.make} {vehicle.model}
      </h1>
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
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
