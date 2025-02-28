import { useEffect, useState } from "react";
import axios from "axios";
import VehicleCard from "../components/VehicleCard";

const Home = () => {
  const [vehicles, setVehicles] = useState([]);

  const backendURL = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    axios
      .get(`${backendURL}/api/vehicles`)
      .then((res) => setVehicles(res.data))
      .catch((err) => console.log(err));
  }, [backendURL]);

  return (
    <div className="container mx-auto p-4 bg-grey-500">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Available Vehicles
      </h1>

      <div className="grid grid-cols-3 gap-4">
        {vehicles.map((vehicle) => (
          <VehicleCard key={vehicle._id} vehicle={vehicle} />
        ))}
      </div>
    </div>
  );
};

export default Home;
