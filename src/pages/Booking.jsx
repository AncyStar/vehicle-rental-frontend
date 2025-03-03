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
      .catch((err) => {
        console.error("Error fetching vehicle details:", err);
        setError("Vehicle not found");
      });
  }, [id]);

  const handleBooking = async () => {
    if (!startDate || !endDate) {
      setError("Please select both start and end dates.");
      return;
    }

    // Validate Dates
    const today = new Date().toISOString().split("T")[0];
    if (startDate < today || endDate < today) {
      setError("Dates cannot be in the past.");
      return;
    }
    if (new Date(startDate) > new Date(endDate)) {
      setError("End date must be after the start date.");
      return;
    }

    // Check if user is logged in
    const token = localStorage.getItem("token");
    console.log("Token Sent:", token); // Debugging
    if (!token) {
      setError("You must log in first.");
      return;
    }

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/bookings`,
        {
          vehicleId: id,
          startDate: new Date(startDate), // Ensure date format
          endDate: new Date(endDate),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      navigate(`/payment/${data.booking._id}`);
    } catch (error) {
      console.error(
        "Error booking vehicle:",
        error.response?.data || error.message
      );
      setError(
        error.response?.data?.message || "Booking failed. Please try again."
      );
    }
  };

  if (!vehicle) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">
        Book {vehicle.make} {vehicle.model}
      </h1>
      <p>Price per day: ${vehicle.pricePerDay}</p>

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

      {/* Display error message BELOW the form instead of replacing everything */}
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default Booking;
