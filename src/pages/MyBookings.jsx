import { useEffect, useState } from "react";
import axios from "axios";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const token = localStorage.getItem("token"); // Get token from local storage

  useEffect(() => {
    const fetchBookings = async () => {
      if (!token) {
        console.error("❌ No token found. User not authenticated.");
        return; // Prevent API call if no token exists
      }

      try {
        const response = await axios.get(
          "https://vehicle-rental-backend-bksz.onrender.com/api/bookings/my", // ✅ Fixed API Route
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log("✅ Bookings received:", response.data); // Debug log
        setBookings(response.data); // Store bookings in state
      } catch (error) {
        console.error("❌ Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, []); // Empty dependency array to run only once on component mount

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
