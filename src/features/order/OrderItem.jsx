import { formatCurrency } from "../../utils/helpers";
import PropTypes from "prop-types";

function OrderItem({ item }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className="py-3">
      <div className="flex items-center justify-between gap-4 text-sm">
        <p>
          <span className="font-bold">{quantity}&times;</span> {name}
        </p>
        <p className="font-bold">{formatCurrency(totalPrice)}</p>
      </div>
    </li>
  );
}

OrderItem.propTypes = {
  item: PropTypes.shape({
    pizzaId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    unitPrice: PropTypes.number,
    totalPrice: PropTypes.number.isRequired,
    isLoadingIngredients: PropTypes.bool,
    ingredients: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};
export default OrderItem;
