import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"; // ✅ Import Link
import API from "../services/api"; // ✅ Use API instead of axios

const VehicleDetails = () => {
  const { id } = useParams(); // ✅ Use `id` to match route `/vehicles/:id`
  const [vehicle, setVehicle] = useState(null);
  const [availableDates, setAvailableDates] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) {
      setError("Vehicle ID is missing. Please select a vehicle again.");
      return;
    }

    // Fetch vehicle details
    API.get(`/vehicles/${id}`)
      .then((res) => setVehicle(res.data))
      .catch(() => setError("Vehicle not found"));

    // Fetch available dates
    API.get(`/vehicles/availability/${id}`)
      .then((res) => setAvailableDates(res.data.unavailableDates || []))
      .catch(() => setError("Error fetching availability."));
  }, [id]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!vehicle) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">
        {vehicle.make} {vehicle.model}
      </h1>
      <img
        src={vehicle.images?.[0] || "/placeholder.jpg"}
        alt={vehicle.model}
        className="w-full h-48 object-cover"
      />
      <p>Year: {vehicle.year}</p>
      <p>Price: ${vehicle.pricePerDay}/day</p>
      <p>{vehicle.description || "No description available."}</p>

      <h2 className="text-lg font-semibold mt-4">Unavailable Dates:</h2>
      {availableDates.length === 0 ? (
        <p className="text-green-500">All dates are available!</p>
      ) : (
        <ul className="text-red-500">
          {availableDates.map((date, index) => (
            <li key={index}>
              <strong>Booked:</strong>{" "}
              {new Date(date.start).toLocaleDateString()} -{" "}
              {new Date(date.end).toLocaleDateString()}
            </li>
          ))}
        </ul>
      )}

      <Link
        to={`/booking/${id}`} // Passes correct vehicle ID
        className="bg-blue-500 text-white p-2 rounded mt-4 inline-block"
      >
        Book Now
      </Link>
    </div>
  );
};

export default VehicleDetails;
