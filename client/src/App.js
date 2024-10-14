import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Slected from "./pages/Slected";
import Checkout from "./pages/Checkout";
import Register from "./pages/Register";
import Login from './pages/Login'
import Success from './pages/Success'
import Cancel from "./pages/Cannel";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart/:id" element={<Cart />} />
        <Route path="/product/:id" element={<Slected />} />
        <Route path="/Checkout" element={<Checkout />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
      </Routes>
    </>
  );
}

export default App;
