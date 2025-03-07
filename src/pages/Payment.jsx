import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Payment = () => {
  const { bookingId: paramBookingId } = useParams(); // ✅ Get bookingId from URL
  const storedBookingId = localStorage.getItem("bookingId"); // ✅ Get from localStorage
  const bookingId = paramBookingId || storedBookingId; // ✅ Use param first, fallback to localStorage

  const [amount, setAmount] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  console.log("🟢 Debugging Payment Page:");
  console.log("🔹 bookingId from URL:", paramBookingId);
  console.log("🔹 bookingId from localStorage:", storedBookingId);
  console.log("🔹 Final bookingId:", bookingId);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!bookingId) {
      setError("❌ Invalid Booking ID. Please try again.");
      return;
    }

    if (!token) {
      setError("❌ You must log in first.");
      return;
    }

    setLoading(true);
    axios
      .get(`${backendUrl}/api/bookings/${bookingId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log("✅ Booking Data Fetched:", res.data);
        setAmount(res.data.totalPrice);
      })
      .catch((err) => {
        console.error(
          "❌ Error fetching booking details:",
          err.response?.data || err.message
        );
        setError(
          err.response?.data?.message || "Error fetching booking details."
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, [bookingId]);

  const handlePayment = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("❌ You must log in first.");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/payments/stripe`,
        { bookingId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.paymentUrl) {
        window.location.href = data.paymentUrl;
      } else {
        throw new Error("❌ Payment URL not received");
      }
    } catch (error) {
      console.error(
        "❌ Error processing payment:",
        error.response?.data || error.message
      );
      setError(
        error.response?.data?.message || "Payment failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (error) return <p className="text-red-500">{error}</p>;
  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Payment</h1>
      <p>Total Amount: ${amount}</p>
      <button
        onClick={handlePayment}
        disabled={loading}
        className={`bg-green-500 text-white p-2 rounded ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
};

export default Payment;
