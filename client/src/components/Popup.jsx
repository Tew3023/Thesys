import { useSelector , useDispatch } from "react-redux";
import { setName,setPrice,setUrl } from "../store/couterSlice";
import {CircleX} from 'lucide-react'
export default function Popup() {
    const dispatch = useDispatch();
  const data = useSelector((state) => state.counter.data);
  const closePopup = () => {
    dispatch(setName(''))
    dispatch(setPrice(''))
    dispatch(setUrl(''))
  }

  return (
    <div>
      {data.url && data.name && (
        <div className=" bg-white/75 border w-80 py-5 px-4 space-y-4 rounded-b-lg">
            <CircleX className="text-zinc-500 cursor-pointer" onClick={closePopup} />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <img src={data.url} alt={data.name} className="w-28 h-28" />
            </div>
            <div className="flex flex-col">
                <div>{data.name}</div>
                <div>${data.price}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
