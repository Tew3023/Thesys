import MaxWrap from "../components/MaxWrap";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/product/products');
        if (!res.ok) {
          throw new Error('Cannot fetch');
        }
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
  }, []);

  if(!products){
    return <div>Loading...</div>
  }

  return (
    <div>
      <MaxWrap>
        <div className="grid grid-cols-5 gap-4">
          {products.map((product) => (
            <div key={product._id} className="border p-4 mt-8 rounded-sm">
              <img src={product.imageUrl} alt={product.name} className="w-full h-40 object-cover" />
              <h2 className="text-lg font-bold mt-2">{product.name}</h2>
              <p className="text-gray-600 h-14">{product.description}</p>
              <p className="text-xl font-semibold">${product.price}</p>
              <Link to={`/product/${product._id}`} >
              <button className="w-full bg-green-300 rounded-lg py-1 mt-2">PURCHASE</button>
              </Link>
            </div>
          ))}
        </div>
      </MaxWrap>
    </div>
  );
}
