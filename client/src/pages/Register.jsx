import { useState } from "react";
import MaxWrap from "../components/MaxWrap";
import axios from "axios";
import { Link } from "react-router-dom";
export default function Register() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    phone: "",
  });

  const handlechange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleRegister = async () => {
    try {
      axios.post("http://localhost:3001/auth/register", {
        email: userData.email,
        password: userData.password,
        phone: userData.phone,
      });
      console.log("Registered successfully!");
    } catch (error) {
      console.log("registeration error");
    }
  };
  return (
    <div>
      <MaxWrap>
        <div className="my-5">
          <div>Email</div>
          <input
            type="text"
            placeholder="email"
            className="w-full py-1 px-2"
            name="email"
            onChange={handlechange}
          />
          <div>password</div>
          <input
            type="password"
            placeholder="password"
            className="w-full py-1 px-2"
            name="password"
            onChange={handlechange}
          />
          <div>phone</div>
          <input
            type="number"
            placeholder="06x-xxx-xxxx"
            className="w-full py-1 px-2"
            name="phone"
            onChange={handlechange}
          />
          <button
            onClick={handleRegister}
            className="w-full py-2 bg-black text-white rounded-lg mt-5"
          >
            Register
          </button>
          <Link to="/login">
            {" "}
            <button className="w-full py-2 bg-white text-black rounded-lg mt-5 b-black border-2">
              Login
            </button>
          </Link>
        </div>
      </MaxWrap>
    </div>
  );
}
