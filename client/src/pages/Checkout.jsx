import React, { useEffect, useState } from "react";
import MaxWrap from "../components/MaxWrap";
import axios from 'axios'
import { Stripe } from 'stripe'
export default function Checkout() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    subDistrict: "",
    district: "",
    province: "",
    postcode: "",
    phone: "",
  });

  const [cartItems, setCartItems] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    const data = localStorage.getItem("cartItems");
    if (data) {
      setCartItems(JSON.parse(data)); 
    }
  }, []);

  const placeorder = async () => {
    const stripe = Stripe(process.env.STRIPE_PUBLIC_KEY)
    const requestData = {
      information: {
        name: `${formData.firstName} ${formData.lastName}`,
        address: `${formData.address} ${formData.subDistrict} ${formData.district} ${formData.province} ${formData.postcode}`,

      },
      products: cartItems.map(item => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })), // Map over cartItems to include all products
    };

    try {
     const response = await axios.post('http://localhost:3001/api/checkout',requestData)
     const session = response.data;

     stripe.redirectToCheckout({
       sessionId: session.id,
     });
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <div>
      <MaxWrap>
        <div className="text-center mt-5 uppercase">
          Full fill your information
        </div>
        <div className="grid grid-cols-2 gap-4 pt-5">
          {/* Form Fields */}
          <div>
            <div>First Name</div>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              className="w-full py-1 px-2"
              value={formData.firstName}
              onChange={handleInputChange}
            />
            <div>Address</div>
            <input
              type="text"
              name="address"
              placeholder="Address"
              className="w-full py-1 px-2"
              value={formData.address}
              onChange={handleInputChange}
            />
            <div>Sub-district</div>
            <input
              type="text"
              name="subDistrict"
              placeholder="Sub-district"
              className="w-full py-1 px-2"
              value={formData.subDistrict}
              onChange={handleInputChange}
            />
            <div>Postcode</div>
            <input
              type="text"
              name="postcode"
              placeholder="Postcode"
              className="w-full py-1 px-2"
              value={formData.postcode}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <div>Last Name</div>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              className="w-full py-1 px-2"
              value={formData.lastName}
              onChange={handleInputChange}
            />
            <div>District</div>
            <input
              type="text"
              name="district"
              placeholder="District"
              className="w-full py-1 px-2"
              value={formData.district}
              onChange={handleInputChange}
            />
            <div>Province</div>
            <input
              type="text"
              name="province"
              placeholder="Province"
              className="w-full py-1 px-2"
              value={formData.province}
              onChange={handleInputChange}
            />
            <div>Phone</div>
            <input
              type="number"
              name="phone"
              placeholder="Phone"
              className="w-full py-1 px-2"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <button
          className="w-full bg-red-500 text-white py-4 rounded-lg mt-5"
          onClick={placeorder}
        >
          Pay
        </button>
      </MaxWrap>
    </div>
  );
}
