import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const VehicleDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/vehicles/${id}`)
      .then((res) => setVehicle(res.data))
      .catch((err) => console.error("Error fetching vehicle:", err));
  }, [id]);

  if (!vehicle) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold">
        {vehicle.make} {vehicle.model} ({vehicle.year})
      </h2>
      <img
        src={vehicle.images[0]}
        alt="Vehicle"
        className="w-full h-60 object-cover my-4 rounded-lg"
      />
      <p>
        Price per day: <strong>${vehicle.pricePerDay}</strong>
      </p>
      <button
        className="btn mt-4"
        onClick={() => navigate(`/book/${vehicle._id}`)}
      >
        Book Now
      </button>
    </div>
  );
};

export default VehicleDetails;
