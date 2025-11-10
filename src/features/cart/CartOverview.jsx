import { Link } from "react-router-dom";

function CartOverview() {
  return (
    <div className="flex items-center justify-between bg-black uppercase px-4 py-4 sm:px-6 text-sm md:text-base">
      <p className="space-x-4 sm:space-x-6 font-semibold">
        <span>23 pizzas</span>
        <span>$23.45</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
