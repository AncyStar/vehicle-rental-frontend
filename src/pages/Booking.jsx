import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Booking = () => {
  const { vehicleId } = useParams();
  const navigate = useNavigate();
  const [unavailableDates, setUnavailableDates] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`${backendUrl}/api/bookings/availability/${vehicleId}`, {
        headers: { Authorization: `Bearer ${token}` }, // ✅ Ensure token is used
      })
      .then((res) => {
        if (res.data?.unavailableDates) {
          setUnavailableDates(res.data.unavailableDates);
        } else {
          console.warn("No unavailable dates received");
        }
      })
      .catch((err) => {
        console.error(
          "Error fetching available dates:",
          err.response?.data || err.message
        );
        setError("Could not fetch unavailable dates. Try again later.");
      });
  }, [vehicleId]);

  const handleBooking = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must log in first.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/bookings`,
        { vehicleId, startDate, endDate },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Booking Response:", data);
      localStorage.setItem("bookingId", data.bookingId); // ✅ Store booking ID for payments
      setSuccess("Booking Successful!");
      setTimeout(() => navigate(`/payment/${data.bookingId}`), 1500); // ✅ Redirect to payment page
    } catch (error) {
      console.error("Booking failed:", error.response?.data || error.message);
      setError(
        error.response?.data?.message || "Booking failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Book Vehicle</h1>

      <h2 className="mt-4 font-semibold">Unavailable Dates:</h2>
      {unavailableDates.length > 0 ? (
        <ul>
          {unavailableDates.map((date, index) => (
            <li key={index} className="text-red-500">
              {date.start.split("T")[0]} to {date.end.split("T")[0]}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-green-500">All dates are available!</p>
      )}

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
        className={`mt-4 bg-blue-500 text-white p-2 rounded ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Processing..." : "Book Now"}
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}
      {success && <p className="text-green-500 mt-2">{success}</p>}
    </div>
  );
};

export default Booking;
