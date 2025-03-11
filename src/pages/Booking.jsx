import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

const Booking = () => {
  const { id } = useParams(); // Get vehicle ID from URL
  const [vehicle, setVehicle] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    API.get(`/vehicles/${id}`)
      .then((res) => setVehicle(res.data))
      .catch(() => setError("Vehicle not found"));
  }, [id]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!vehicle) return <p>Loading booking details...</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">
        Book {vehicle.make} {vehicle.model}
      </h1>
      <p>Price: ${vehicle.pricePerDay}/day</p>
      <p>{vehicle.description || "No description available."}</p>

      {/* Booking Form Placeholder */}
      <form className="mt-4">
        <label className="block">Select Dates:</label>
        <input type="date" className="border p-2 w-full mt-2" required />
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
