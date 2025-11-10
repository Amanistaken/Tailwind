// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

import { Form, redirect, useActionData, useNavigate } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";

const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  const navigation = useNavigate();
  const isSubmitting = navigation.state === "submitting";

  const formErrors = useActionData();
  // const [withPriority, setWithPriority] = useState(false);
  const cart = fakeCart;
  console.log(cart);

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 font-semibold text-xl">Ready to order? Lets go!</h2>

      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center ">
          <label className="sm:basis-40">First Name</label> <br></br>
          <input className="input" type="text" name="customer" required />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center ">
          <label className="sm:basis-40">Phone number</label>
          <div>
            <input className="input" type="tel" name="phone" required />
          </div>
          {formErrors?.phone && <p className="text-xs mt-2 bg-red-100 text-red-700 p-2 rounded-md">{formErrors.phone}</p>}
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center ">
          <label className="sm:basis-40">Address</label>
          <div>
            <input className="input" type="text" name="address" required />
          </div>
        </div>

        <div className="mt-2 mb-12 flex items-center gap-5">
          <input
          className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">Want to give your order priority?</label>
        </div>

        <div className="inline-block font-semibold  bg-yellow-400 px-4 py-2 rounded-full hover:bg-yellow-300 ">
          <button disabled={isSubmitting}>
            {isSubmitting ? "Placing order...." : "Order now"}
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
    priority: data.priority === "on",
  };

  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone = "Please give us your correct phone number";

  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);
  console.log(createOrder);

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
