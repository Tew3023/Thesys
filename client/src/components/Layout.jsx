import Navbar from "./Navbar";
import Popup from "./Popup";
export default function Layout({ children }) {
  return (
    <div>
      <div className="sticky top-0 z-[100]">
        <Navbar />
      </div>
      <div className="fixed top-20 right-20 z-[99]">
        <Popup />
      </div>
      {children}
    </div>
  );
}
