import { Search, User, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from 'axios';
export default function Navbar() {
  const [cook,setCook] = useState('')
  useEffect(()=>{
    const getCokkies = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      const cookieResponse = await axios.get("http://localhost:3001/cookies", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setCook(cookieResponse.data.payload.id)
    }
    getCokkies();
  },[])
  return (
      <nav className="h-20 bg-white/75 w-full border border-b border-zinc-200 backdrop-blur-xl">
        <div className="h-full w-full flex justify-between items-center mx-auto px-2.5 md:px-20">
          <div className="flex space-x-10">
            <NavLink to="/" className="text-2xl font-semibold">
              THESYS
            </NavLink>
          </div>
          <div className="flex space-x-5">
            <Search className="w-5 h-5" />
            <NavLink to="/register"><User className="w-5 h-5" /></NavLink>
            <NavLink to={`/cart/${cook}`}>
              {" "}
              <ShoppingBag className="w-5 h-5" />
            </NavLink>
          </div>
        </div>
      </nav>
  );
}
