import { useEffect, useState } from "react";
import API from "../services/api"; // Axios instance with auto-token
import PaymentButton from "../components/PaymentButton"; // Import the Payment Button component

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem("token");
      console.log("Token being sent:", token);

      if (!token) {
        console.error("No token found in localStorage");
        setError("Authentication error. Please log in again.");
        setLoading(false);
        return;
      }

      try {
        const response = await API.get("/bookings/my"); // Fetch only user's bookings
        console.log("Bookings received:", response.data);
        setBookings(response.data);
      } catch (error) {
        console.error(
          "Error fetching bookings:",
          error.response?.data || error.message
        );

        if (error.response?.status === 401) {
          setError("Session expired. Please log in again.");
          localStorage.removeItem("token");
          setTimeout(() => (window.location.href = "/login"), 2000);
        } else {
          setError(error.response?.data?.message || "Failed to fetch bookings");
        }
      } finally {
        setLoading(false);
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

              {/* Show Payment Button only if booking is pending */}
              {booking.status === "pending" && (
                <PaymentButton
                  bookingId={booking._id}
                  amount={booking.totalPrice}
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyBookings;
