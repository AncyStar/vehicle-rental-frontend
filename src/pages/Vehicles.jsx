import { useEffect, useState } from "react";
import axios from "axios";
import VehicleCard from "../components/VehicleCard";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    axios
      .get(`${backendUrl}/api/vehicles`)
      .then((res) => setVehicles(res.data))
      .catch((err) => console.error("Error fetching vehicles:", err));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Available Vehicles</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {vehicles.map((vehicle) => (
          <VehicleCard key={vehicle._id} vehicle={vehicle} />
        ))}
      </div>
    </div>
  );
};

export default Vehicles;
