import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";

function Header() {
  return (
    <header className="bg-yellow-400 px-4 py-3 uppercase border-b-4 border-white sm:px-6 flex items-center justify-between ">
      <Link to="/" className="tracking-widest font-robo">
        Fast React Pizza Co.
      </Link>
      <SearchOrder />
      <h1 className="hidden md:block ">Aman</h1>
    </header>
  );
}

export default Header;
