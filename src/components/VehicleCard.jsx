import { Link } from "react-router-dom";

const VehicleCard = ({ vehicles }) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Available Vehicles</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {vehicles.map((vehicle) => (
          <div key={vehicle._id} className="border p-4 rounded shadow">
            <img
              src={vehicle.images?.[0] || "/placeholder.jpg"}
              alt={vehicle.model}
              className="w-full h-48 object-cover"
            />
            <h2 className="text-lg font-semibold">
              {vehicle.make} {vehicle.model}
            </h2>
            <p>Year: {vehicle.year}</p>
            <p>Price: ${vehicle.pricePerDay}/day</p>

            {/* View Details Link */}
            <Link
              to={`/vehicle/${vehicle._id}`}
              className="bg-blue-500 text-white px-4 py-2 mt-2 inline-block rounded"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VehicleCard;
