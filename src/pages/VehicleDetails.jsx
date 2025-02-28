import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const VehicleDetails = () => {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);

  useEffect(() => {
    axios
      .get(`https://your-backend-url.com/api/vehicles/${id}`)
      .then((res) => setVehicle(res.data))
      .catch((err) => console.error(err));
  }, [id]);

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
    </div>
  );
};

export default VehicleDetails;
