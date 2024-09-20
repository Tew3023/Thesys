import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MaxWrap from "../components/MaxWrap";
import { useDispatch } from 'react-redux'
import { setName,setPrice,setUrl } from "../store/couterSlice";

export default function Slected() {
  const dispatch = useDispatch()
  const handdleBuy = (product) => {
    dispatch(setName(product.name))
    dispatch(setPrice(product.price))
    dispatch(setUrl(product.imageUrl))
    const storeCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const exitingitem = storeCartItems.find(
      (item) => item.name === product.name
    );
    if (exitingitem) {
      exitingitem.quantity += 1;
    } else {
      const cartItem = {
        ...product,
        quantity: 1,
      };
      storeCartItems.push(cartItem);
    }
    localStorage.setItem("cartItems", JSON.stringify(storeCartItems));
  };

  const { id } = useParams();
  const [product, setProduct] = useState(null);

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

  return (
    <div>
      <MaxWrap>
        <div className="flex flex-col md:flex-row items-start justify-center  p-6 rounded-md mt-8">
          {/* Left Side: Image */}
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
              onClick={() => handdleBuy(product)}
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
