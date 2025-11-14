import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { decreaseItemQuantity, increaseItemQuantity } from "./cartSlice";


function UpdateItemQuantity({ pizzaId,currentQuantity }) {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center gap-2">
      <button
        className="input bg-yellow-400"
        onClick={() => dispatch(decreaseItemQuantity(pizzaId))}
      >
        -
      </button>
      <span className="text-sm font-medium">{currentQuantity}</span>
      <button
        className="input bg-yellow-400"
        onClick={() => dispatch(increaseItemQuantity(pizzaId))}
      >
        +
      </button>
    </div>
  );
}

UpdateItemQuantity.propTypes = {
  pizzaId: PropTypes.number.isRequired,
  currentQuantity: PropTypes.number.isRequired
};

export default UpdateItemQuantity;
