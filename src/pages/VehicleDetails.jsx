import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const VehicleDetails = () => {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`${backendUrl}/api/vehicles/${id}`)
      .then((res) => setVehicle(res.data))
      .catch((err) => {
        console.error("Error fetching vehicle details:", err);
        setError("Vehicle not found");
      });
  }, [id]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!vehicle) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">
        {vehicle.make} {vehicle.model}
      </h1>
      <img
        src={vehicle.images[0]}
        alt={vehicle.model}
        className="w-full h-64 object-cover"
      />
      <p>Year: {vehicle.year}</p>
      <p>Price: ${vehicle.pricePerDay}/day</p>
      <p>{vehicle.description}</p>
      <Link
        to={`/booking/${vehicle._id}`}
        className="bg-blue-500 text-white p-2 rounded mt-4 inline-block"
      >
        Book Now
      </Link>
    </div>
  );
};

export default VehicleDetails;
