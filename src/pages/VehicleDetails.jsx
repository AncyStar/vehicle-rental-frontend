import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../services/api";

const VehicleDetails = () => {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);

  useEffect(() => {
    axios
      .get(`/vehicles/${id}`)
      .then((response) => setVehicle(response.data))
      .catch((error) => console.error("Error fetching vehicle:", error));
  }, [id]);

  if (!vehicle) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">
        {vehicle.make} {vehicle.model}
      </h2>
      <img
        src={vehicle.imageUrls[0]}
        alt={vehicle.model}
        className="w-full h-60 object-cover rounded"
      />
      <p>Year: {vehicle.year}</p>
      <p>Price per day: ${vehicle.pricePerDay}</p>
      <p>Location: {vehicle.location}</p>
    </div>
  );
};

export default VehicleDetails;
