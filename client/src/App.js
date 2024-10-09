import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Slected from "./pages/Slected";
import Checkout from "./pages/Checkout";
import Register from "./pages/Register";
import Login from './pages/Login'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<Slected />} />
        <Route path="/Checkout" element={<Checkout />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
