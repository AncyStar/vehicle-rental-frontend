import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

const Booking = () => {
  const { id } = useParams(); // ✅ Get vehicle ID from URL
  const [vehicle, setVehicle] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    API.get(`/vehicles/${id}`)
      .then((res) => setVehicle(res.data))
      .catch(() => setError("Vehicle not found"));
  }, [id]);

  const handleBookingSubmit = (e) => {
    e.preventDefault();

    if (!startDate || !endDate) {
      alert("Please select both start and end dates.");
      return;
    }

    const days =
      (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24);
    if (days <= 0) {
      alert("End date must be after start date.");
      return;
    }

    const totalPrice = days * (vehicle?.pricePerDay || 0); // Ensure pricePerDay exists

    console.log("Booking Data:", {
      vehicleId: id,
      startDate,
      endDate,
      totalPrice,
    });

    API.post("/bookings", { vehicleId: id, startDate, endDate, totalPrice })
      .then(() => alert("Booking successful!"))
      .catch(() => alert("Booking failed."));
  };

  if (error) return <p className="text-red-500">{error}</p>;
  if (!vehicle) return <p>Loading booking details...</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">
        Book {vehicle.make} {vehicle.model}
      </h1>
      <p>Price: ${vehicle.pricePerDay}/day</p>
      <p>{vehicle.description || "No description available."}</p>

      {/* Booking Form */}
      <form className="mt-4" onSubmit={handleBookingSubmit}>
        <label className="block">Start Date:</label>
        <input
          type="date"
          className="border p-2 w-full mt-2"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />

        <label className="block mt-2">End Date:</label>
        <input
          type="date"
          className="border p-2 w-full mt-2"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 mt-4 w-full"
        >
          Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default Booking;
