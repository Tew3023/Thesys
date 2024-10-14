import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MaxWrap from "../components/MaxWrap";
import axios from "axios";

export default function Cart() {
  const { id } = useParams();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        if (!id) return;
        const res = await axios.get(`http://localhost:3001/order?userId=${id}`);
        console.log(res.data);
        setOrders(res.data.result || []); 
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError("Error fetching orders");
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [id]);

  if (loading) {
    return (
      <MaxWrap>
        <div className="text-center py-10">Loading...</div>
      </MaxWrap>
    );
  }

  if (error) {
    return (
      <MaxWrap>
        <div className="text-red-500 text-center py-10">{error}</div>
      </MaxWrap>
    );
  }

  // No ID case
  if (!id) {
    return (
      <MaxWrap>
        <div className="text-center py-10">No user ID provided.</div>
      </MaxWrap>
    );
  }

  // Render orders
  return (
    <div>
      <MaxWrap>
        <h1 className="text-2xl font-bold my-4">Your Orders</h1>
        {orders.length === 0 ? (
          <p>You don't have any orders yet.</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order._id} className="border p-4 rounded-md shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-lg font-bold">Order #{order._id}</h2>
                    <p className="text-gray-600">
                      Date: {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-gray-600">Status: {order.status}</p>
                    {order.items && order.items.map((item, index) => (
                      <div key={`${order._id}-${index}`} className="mt-2 pl-4 border-l-2">
                        <p>{item.name} - ${item.price}</p>
                        <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                      </div>
                    ))}
                  </div>
                  <div className="text-right">
                    <p className="font-bold">Total: ${order.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </MaxWrap>
    </div>
  );
}
