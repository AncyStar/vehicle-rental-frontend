import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Vehicles from "./pages/Vehicles";
import VehicleDetails from "./pages/VehicleDetails";
import Booking from "./pages/Booking";
import Payment from "./pages/Payment";
import AddVehicle from "./pages/AddVehicle";
import Logout from "./pages/Logout";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/vehicle/:vehicleId" element={<VehicleDetails />} />
        <Route path="/booking/:vehicleId" element={<Booking />} />
        <Route path="/payment/:bookingId" element={<Payment />} />
        <Route path="/admin/add-vehicle" element={<AddVehicle />} />
        <Route path="/logout" element={<Logout />} />

        {/* Catch-All for 404 Pages */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
