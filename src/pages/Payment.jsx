import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Payment = () => {
  let { bookingId } = useParams();
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState("");
  // Ensure `bookingId` exists
  if (!bookingId) {
    bookingId = localStorage.getItem("bookingId");
  }
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must log in first.");
      return;
    }

    if (!bookingId) {
      setError("Invalid Booking ID.");
      return;
    }

    console.log("Booking ID:", bookingId); // Debugging

    axios
      .get(`${backendUrl}/api/bookings/${bookingId}`, {
        headers: { Authorization: `Bearer ${token}` }, // Add authentication
      })
      .then((res) => {
        console.log("Booking Data:", res.data);
        setAmount(res.data.totalPrice);
      })
      .catch((err) => {
        console.error("Error fetching booking details:", err);
        setError("Booking not found.");
      });
  }, [bookingId]);

  const handlePayment = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must log in first.");
      return;
    }

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/payments/stripe`,
        { bookingId },
        {
          headers: { Authorization: `Bearer ${token}` }, // Ensure token is sent
        }
      );
      console.log("Payment Response:", data);

      if (data.paymentUrl) {
        window.location.href = data.paymentUrl;
      } else {
        throw new Error("Payment initiation failed. Please try again later.");
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      setError("Payment failed. Please try again.");
    }
  };

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Payment</h1>
      <p>Total Amount: ${amount}</p>
      <button
        onClick={handlePayment}
        className="bg-green-500 text-white p-2 rounded"
      >
        Pay Now
      </button>
    </div>
  );
};

export default Payment;
