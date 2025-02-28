import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Booking = () => {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    axios
      .get(`${backendUrl}/api/vehicles/${id}`)
      .then((res) => setVehicle(res.data))
      .catch((err) => console.error("Error fetching vehicle details:", err));
  }, [id]);

  const handleBooking = async () => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/bookings`,
        {
          vehicleId: id,
          startDate,
          endDate,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      window.location.href = `/payment/${data.booking._id}`;
    } catch (error) {
      console.error("Error booking vehicle:", error);
      alert("Booking failed. Please try again.");
    }
  };

  if (!vehicle) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">
        Book {vehicle.make} {vehicle.model}
      </h1>
      <p>Price per day: ${vehicle.pricePerDay}</p>
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="border p-2 m-2"
        required
      />
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="border p-2 m-2"
        required
      />
      <button
        onClick={handleBooking}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Book Now
      </button>
    </div>
  );
};

export default Booking;
