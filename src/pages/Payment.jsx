import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Payment = () => {
  const { bookingId } = useParams();
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`${backendUrl}/api/bookings/${bookingId}`)
      .then((res) => {
        if (res.data && res.data.totalPrice) {
          setAmount(res.data.totalPrice);
        } else {
          throw new Error("Invalid booking data received");
        }
      })
      .catch((err) => {
        console.error("Error fetching booking details:", err);
        setError("Booking not found.");
      });
  }, [bookingId]);

  const handlePayment = async () => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/payments/stripe`,
        { bookingId },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (data.paymentUrl) {
        window.location.href = data.paymentUrl;
      } else {
        throw new Error("Payment URL not received");
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
