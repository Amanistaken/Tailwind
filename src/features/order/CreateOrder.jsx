// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

import { Form, redirect, useActionData, useNavigate } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import { useSelector } from "react-redux";
import { getCartItems, getCartTotalPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store";
import { clearCart } from "../cart/cartSlice";
import { formatCurrency } from "../../utils/helpers";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAddress } from "../user/userSlice";

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);

  const dispatch = useDispatch();

  const {
    username,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useSelector((state) => state.user);
  const isLoadingAddress = addressStatus === "loading";
  console.log(position);

  const navigation = useNavigate();
  const isSubmitting = navigation.state === "submitting";

  const formErrors = useActionData();
  const cart = useSelector(getCartItems);
  const totalCartPrice = useSelector(getCartTotalPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 font-semibold text-xl">Ready to order? Lets go!</h2>

      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center ">
          <label className="sm:basis-40">First Name</label> <br></br>
          <input
            className="input"
            type="text"
            name="customer"
            defaultValue={username}
            required
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center ">
          <label className="sm:basis-40">Phone number</label>
          <div>
            <input className="input" type="tel" name="phone" required />
          </div>
          {formErrors?.phone && (
            <p className="text-xs mt-2 bg-red-100 text-red-700 p-2 rounded-md">
              {formErrors.phone}
            </p>
          )}
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center ">
          <label className="sm:basis-40">Address</label>
          <div>
            <input
              className="input"
              type="text"
              name="address"
              defaultValue={address}
              disabled={isLoadingAddress}
              required
            />
          </div>
          {!position.latitude && !position.longitude && (
            <>
              <button
                type="button"
                onClick={() => dispatch(fetchAddress())}
                className="input bg-yellow-400"
                disabled={isLoadingAddress}
                defaultValue={address}
              >
                Get Position
              </button>
              {addressStatus === "error" && (
                <p className="text-xs mt-2 bg-red-100 text-red-700 p-2 rounded-md">
                  {errorAddress}
                </p>
              )}
            </>
          )}
        </div>

        <div className="mt-2 mb-12 flex items-center gap-5">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to give your order priority?
          </label>
        </div>

        <div className="inline-block font-semibold  bg-yellow-400 px-4 py-2 rounded-full hover:bg-yellow-300 ">
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.latitude && position.longitude
                ? `${position.latitude}, ${position.longitude}`
                : ""
            }
          />
          <button disabled={isSubmitting}>
            {isSubmitting
              ? "Placing order...."
              : ` Order now ${formatCurrency(totalPrice)}`}
          </button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };

  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone = "Please give us your correct phone number";

  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);

  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
