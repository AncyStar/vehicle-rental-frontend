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

    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must log in first.");
      return;
    }

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/bookings`,
        {
          vehicleId: id,
          startDate,
          endDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Ensure correct format
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

  if (error) return <p className="text-red-500">{error}</p>;
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
    </div>
  );
};

export default Booking;
