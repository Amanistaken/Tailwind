import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";
import { clearCart, getCartItems } from "./cartSlice";
import { useDispatch } from "react-redux";
import EmptyCart from "./EmptyCart";

function Cart() {
  const username = useSelector((state) => state.user.username);
  const cart = useSelector(getCartItems);
  const dispatch = useDispatch();

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-3 py-4 ">
      <h2 className="mt-7 text-xl font-semibold">Your cart, {username}</h2>

      <ul className="divide-y divide-stone-200 border-b">
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId}></CartItem>
        ))}
      </ul>

      <div className="flex gap-2 mt-6 ">
        <Link
          to="/order/new"
          className="font-semibold  bg-yellow-400 px-4 py-2 rounded-full hover:bg-yellow-300 uppercase"
        >
          Order pizzas
        </Link>
        <button
          className="border-2 rounded-full hover:bg-stone-300 px-4 py-2 md:px-6 text-stone-400 font-bold focus:outline-none focus:ring focus:ring-stone-200 focus:ring-offset-2"
          onClick={() => dispatch(clearCart())}
        >
          Clear cart
        </button>
      </div>
    </div>
  );
}

export default Cart;
