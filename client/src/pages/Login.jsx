import { useState } from "react";
import MaxWrap from "../components/MaxWrap";
import axios from "axios";

export default function Login() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handlechange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const loginProcess = async () => {
    try {
      const response = await axios.post("http://localhost:3001/auth/login", {
        email: userData.email,
        password: userData.password,
      }, {
        withCredentials: true 
      });
      if (response.status === 200) {
        const token = response.data.token
        localStorage.setItem('token',token)
        window.location.href = "/";
      }
    } catch (error) {
      if (error.response) {
        console.log("Login error:", error.response.data);
      } else if (error.request) {
        console.log("No response from server:", error.request);
      } else {
        console.log("Error setting up login request:", error.message);
      }
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
          <button onClick={loginProcess} className="w-full py-2 bg-blue-500 text-white rounded-lg mt-5">
            Login
          </button>
        </div>
      </MaxWrap>
    </div>
  );
}
