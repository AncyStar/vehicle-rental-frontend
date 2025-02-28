import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Payment = () => {
  const { bookingId } = useParams();

  const [amount, setAmount] = useState(0);

  useEffect(() => {
    axios
      .get(`${backendUrl}/api/bookings/${bookingId}`)
      .then((res) => setAmount(res.data.totalPrice))
      .catch((err) => console.error("Error fetching booking details:", err));
  }, [bookingId]);

  const handlePayment = async () => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/payments/stripe`,
        {
          bookingId,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      window.location.href = data.paymentUrl;
    } catch (error) {
      console.error("Error processing payment:", error);
      alert("Payment failed. Please try again.");
    }
  };

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
