import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCartTotalPrice, getCartTotalQuantity } from "./cartSlice";

function CartOverview() {
  const totalCartQuantity = useSelector(getCartTotalQuantity);
  const CartTotalPrice = useSelector(getCartTotalPrice);

  if (!totalCartQuantity) return null;
  return (
    <div className="flex items-center justify-between bg-black uppercase px-4 py-4 sm:px-6 text-sm md:text-base text-stone-50">
      <p className="space-x-4 sm:space-x-6 font-semibold">
        <span>{totalCartQuantity} Pizza</span>
        <span>${CartTotalPrice}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
