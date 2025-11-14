import { useDispatch } from "react-redux";
import { removeItem } from "./cartSlice";
import PropTypes from "prop-types"

function DeleteItems({ pizzaId }) {
  const dispatch = useDispatch();
  return (
    <button
      className="input bg-yellow-400 "
      onClick={() => dispatch(removeItem(pizzaId))}
    >
      Delete
    </button>
  );
}

DeleteItems.propTypes ={
    pizzaId: PropTypes.number.isRequired,
};

export default DeleteItems;
