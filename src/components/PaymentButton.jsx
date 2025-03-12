import React, { useState } from "react";
import API from "../services/api";

const PaymentButton = ({ bookingId }) => {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Authentication required. Please log in.");
      return;
    }

    setLoading(true);
    try {
      const response = await API.post(
        "/payments/create-checkout-session",
        { bookingId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.url) {
        window.location.href = response.data.url; // Redirect to Stripe
      } else {
        throw new Error("Invalid response from payment gateway.");
      }
    } catch (error) {
      console.error("Error initiating payment:", error);
      alert(error.response?.data?.message || "Payment failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className={`bg-blue-500 text-white px-4 py-2 rounded ${
        loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      }`}
    >
      {loading ? "Processing..." : "Pay Now"}
    </button>
  );
};

export default PaymentButton;
