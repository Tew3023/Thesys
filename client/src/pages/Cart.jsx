import { useEffect, useState } from "react";
import MaxWrap from "../components/MaxWrap";
import { Minus, Plus } from "lucide-react";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem("cartItems");
    if (data) {
      setCartItems(JSON.parse(data));
    }
  }, []);

  const handleRemove = (itemName) => {
    const updatedCart = cartItems.filter((item) => item.name !== itemName);
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  const getTotalPrice = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const editQuantity = (itemName, value) => {
    const updatedCart = cartItems.map((item) => {
      if (item.name === itemName) {
        const newQuantity = item.quantity + value;
        return {
          ...item,
          quantity: newQuantity > 0 ? newQuantity : 1, 
        };
      }
      return item;
    });
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  return (
    <div>
      <MaxWrap>
        <h1 className="text-2xl font-bold my-4">Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div>
            {cartItems.map((item) => (
              <div key={item.name} className="border p-4 mt-4 rounded-md">
                <div className="flex justify-between items-center">
                  <div>
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-20 h-20"
                    />
                    <h2 className="text-lg font-bold">{item.name}</h2>
                    <p className="text-gray-600">
                      Price: ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="space-x-2 flex">
                    <div className="flex items-center space-x-4">
                      <Minus
                        onClick={() => {
                          editQuantity(item.name, -1);
                        }}
                        className="h-5 w-5 cursor-pointer"
                      />
                      <span>{item.quantity}</span>
                      <Plus
                        onClick={() => {
                          editQuantity(item.name, 1);
                        }}
                        className="h-5 w-5 cursor-pointer"
                      />
                    </div>
                    <button
                      onClick={() => handleRemove(item.name)}
                      className="bg-red-500 text-white py-1 px-2 rounded"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div className="text-right mt-4">
            <button className="w-full h-full text-center bg-blue-300 py-2 ">Check Out</button>
              <h2 className="text-xl font-semibold">
                Total Price: ${getTotalPrice().toFixed(2)}
              </h2>
            </div>
          </div>
        )}
      </MaxWrap>
    </div>
  );
}
