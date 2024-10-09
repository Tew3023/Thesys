import { Search, User, ShoppingBag } from "lucide-react";
import { NavLink } from "react-router-dom";
export default function Navbar() {

  return (
      <nav className="h-20 bg-white/75 w-full border border-b border-zinc-200 backdrop-blur-xl">
        <div className="h-full w-full flex justify-between items-center mx-auto px-2.5 md:px-20">
          <div className="flex space-x-10">
            <NavLink to="/" className="text-2xl font-semibold">
              THESYS
            </NavLink>
            <div className="space-x-3 flex">
              <NavLink to="/snow">snow</NavLink>
              <NavLink to="/sun">sun</NavLink>
            </div>
          </div>
          <div className="flex space-x-5">
            <Search className="w-5 h-5" />
            <NavLink to="/register"><User className="w-5 h-5" /></NavLink>
            <NavLink to="/cart">
              {" "}
              <ShoppingBag className="w-5 h-5" />
            </NavLink>
          </div>
        </div>
      </nav>
  );
}
