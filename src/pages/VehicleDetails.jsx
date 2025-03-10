import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const VehicleDetails = () => {
  const { vehicleId } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!vehicleId) {
      setError("Vehicle ID is missing. Please select a vehicle.");
      return;
    }

    axios
      .get(`${backendUrl}/api/vehicles/${vehicleId}`)
      .then((res) => setVehicle(res.data))
      .catch(() => setError("Vehicle not found"));
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

      <Link
        to={`/booking/${vehicleId}`}
        className="bg-blue-500 text-white p-2 rounded mt-4 inline-block"
      >
        Book Now
      </Link>
    </div>
  );
};

export default VehicleDetails;
