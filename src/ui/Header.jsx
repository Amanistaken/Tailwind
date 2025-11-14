import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import Username from "../features/user/userName";

function Header() {
  return (
    <header className="bg-yellow-400 px-4 py-3 uppercase border-b-4 border-white sm:px-6 flex items-center justify-between ">
      <Link to="/" className="tracking-widest font-robo">
        Fast React Pizza Co.
      </Link>
      <SearchOrder />
      <Username />
    </header>
  );
}

export default Header;
