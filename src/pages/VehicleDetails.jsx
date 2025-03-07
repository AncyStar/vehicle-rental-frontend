import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const VehicleDetails = () => {
  const { vehicleId } = useParams(); // ✅ Get vehicleId correctly
  const [vehicle, setVehicle] = useState(null);
  const [availableDates, setAvailableDates] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!vehicleId) {
      setError("Vehicle ID is missing. Please select a vehicle again.");
      return;
    }

    // Fetch vehicle details
    axios
      .get(`${backendUrl}/api/vehicles/${vehicleId}`)
      .then((res) => setVehicle(res.data))
      .catch(() => setError("Vehicle not found"));

    // Fetch available dates
    axios
      .get(`${backendUrl}/api/vehicles/availability/${vehicleId}`)
      .then((res) => setAvailableDates(res.data.unavailableDates))
      .catch(() => setError("Error fetching availability."));
  }, [vehicleId]);

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
        className="w-full h-64 object-cover"
      />
      <p>Year: {vehicle.year}</p>
      <p>Price: ${vehicle.pricePerDay}/day</p>
      <p>{vehicle.description}</p>

      {/* Display unavailable dates */}
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
        to={`/booking/${vehicleId}`} //Correctly passes vehicleId to Booking page
        className="bg-blue-500 text-white p-2 rounded mt-4 inline-block"
      >
        Book Now
      </Link>
    </div>
  );
};

export default VehicleDetails;
