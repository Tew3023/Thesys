import { useLocation } from "react-router-dom";
import MaxWrap from "../components/MaxWrap";
import {Link} from 'react-router-dom'
export default function Success() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const orderId = params.get("id");

  return (
    <div>
      <MaxWrap>
        <div className="flex items-center flex-col my-10">
          <h1 className="text-3xl text-green-600 font-semibold">Payment Successful!</h1>
          <p className="mt-10 text-xl">Your order ID is: {orderId}</p>
          <Link to='/'><button className="bg-green-500 text-white px-10 py-2 rounded-xl mt-10">Back to Homepage</button> </Link>
        </div>
      </MaxWrap>
    </div>
  );
}
