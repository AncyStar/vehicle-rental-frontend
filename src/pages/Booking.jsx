import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Booking = () => {
  const { vehicleId } = useParams();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!vehicleId) {
      setError("Vehicle ID is missing. Please select a vehicle.");
      return;
    }

    axios
      .get(`${backendUrl}/api/vehicles/${vehicleId}`)
      .then((res) => setVehicle(res.data))
      .catch(() => setError("Could not fetch vehicle details."));
  }, [vehicleId]);

  const handleBooking = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must log in first.");
      return;
    }

    if (!startDate || !endDate) {
      setError("Please select start and end dates.");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/bookings`,
        { vehicleId, startDate, endDate },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.booking?._id) {
        localStorage.setItem("bookingId", data.booking._id);
        navigate(`/payment/${data.booking._id}`);
      } else {
        throw new Error("Booking ID is missing from response.");
      }

      setSuccess("Booking successful!");
    } catch (error) {
      setError(error.response?.data?.message || "Booking failed.");
    } finally {
      setLoading(false);
    }
  };

  if (!vehicle) return <p>Loading vehicle details...</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">
        Book {vehicle.make} {vehicle.model}
      </h1>

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
        disabled={loading}
        className="mt-4 bg-blue-500 text-white p-2 rounded"
      >
        {loading ? "Processing..." : "Book Now"}
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}
      {success && <p className="text-green-500 mt-2">{success}</p>}
    </div>
  );
};

export default Booking;
