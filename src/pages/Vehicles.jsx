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
    <div>
      <VehicleCard vehicles={vehicles} />
    </div>
  );
};

export default Vehicles;
