import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MaxWrap from "../components/MaxWrap";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const stripePromise = loadStripe(
  "pk_test_51PRuNY04lW6eIyidjjpqLYVaN47PRg0edOzABMagWt8QLFXjgRIhOfclJZx8J5b3Z1Y3Ei3HrVI2Tiu4f1u99Nby00MKgyaKYl"
);

export default function Slected() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [userData, setUserData] = useState({
    email: '',
    id: ''
  });

  useEffect(() => {
    const getUserData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.log("No token found");
          return;
        }

        const res = await axios.get('http://localhost:3001/cookies', {
          headers: {
            'authorization': `Bearer ${token}` 
          }
        });

        setUserData({
          email: res.data.payload.email,
          id: res.data.payload.id
        });

      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };

    getUserData();
  }, []);

  useEffect(() => {
    const getTheProduct = async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/product/${id}`);
        if (!res.ok) {
          throw new Error("Cannot fetch product details");
        }
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    getTheProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const placeorder = async () => {
    try {
      const requestData = {
        information: {
          name: userData.email, 
          userId: userData.id,
          address: "51 11 dom sangkha surin",
        },
        product: {
          name: product.name,
          price: product.price,
          quantity: 1,
        },
      };

      const response = await axios.post(
        "http://localhost:3001/api/checkout",
        requestData
      );
      const session = response.data;
      const stripe = await stripePromise;

      await stripe.redirectToCheckout({
        sessionId: session.sessionId,
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div>
      <MaxWrap>
        <div className="flex flex-col md:flex-row items-start justify-center p-6 rounded-md mt-8">
          <div className="w-full md:w-1/2">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-64 object-cover rounded-md"
            />
          </div>
          <div className="w-full md:w-1/2 md:pl-6 mt-4 md:mt-0">
            <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <p className="text-xl font-semibold mb-6">${product.price}</p>
            <button
              onClick={placeorder}
              className="text-center w-full md:w-auto py-2 px-6 bg-green-500 text-white rounded-md"
            >
              PURCHASE
            </button>
          </div>
        </div>
      </MaxWrap>
    </div>
  );
}
