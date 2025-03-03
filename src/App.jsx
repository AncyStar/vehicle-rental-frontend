import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VehicleDetails from "./pages/VehicleDetails";
import Booking from "./pages/Booking";
import Payment from "./pages/Payment";
import AddVehicle from "./components/AddVehicle";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/vehicle/:id" element={<VehicleDetails />} />
          <Route path="/booking/:id" element={<Booking />} />
          <Route path="/payment/:bookingId" element={<Payment />} />
          <Route path="/admin/add-vehicle" element={<AddVehicle />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
