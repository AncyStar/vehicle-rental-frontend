import { useEffect, useState } from "react";
import API from "../services/api"; // Import Axios instance

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); //Added loading state

  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found in localStorage");
        return;
      }
      try {
        const response = await API.get("/bookings/my"); // Uses the Axios instance
        console.log("Bookings received:", response.data);
        setBookings(response.data);
      } catch (error) {
        console.error(
          "Error fetching bookings:",
          error.response?.data || error.message
        );
        setError(error.response?.data?.message || "Failed to fetch bookings");
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchBookings();
  }, []);

  if (loading) return <p>Loading bookings...</p>;
  if (error) return <p className="text-red-500">❌ {error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Your Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found</p>
      ) : (
        <ul>
          {bookings.map((booking) => (
            <li key={booking._id} className="border p-4 mb-2">
              <p>
                <strong>Vehicle:</strong> {booking.vehicle?.name || "Unknown"}
              </p>
              <p>
                <strong>Start Date:</strong>{" "}
                {new Date(booking.startDate).toLocaleDateString()}
              </p>
              <p>
                <strong>End Date:</strong>{" "}
                {new Date(booking.endDate).toLocaleDateString()}
              </p>
              <p>
                <strong>Total Price:</strong> ${booking.totalPrice}
              </p>
              <p>
                <strong>Status:</strong> {booking.status}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyBookings;
