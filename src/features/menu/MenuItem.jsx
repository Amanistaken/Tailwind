import { formatCurrency } from "../../utils/helpers";
import PropTypes from "prop-types";

function MenuItem({ pizza }) {
  const { name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  return (
    <li className="flex gap-2 py-2">
      <img src={imageUrl} alt={name} className={`h-24 ${soldOut? "opacity-70 grayscale" : ""}`} />
      <div className="flex flex-col grow">
        <p className="font-medium">{name}</p>
        <p className="text-sm italic text-stone-500 capitalize">{ingredients.join(", ")}</p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p
              className="uppercase text-sm font-medium text-stone-500
          "
            >
              Sold out
            </p>
          )}
          <button className={`input bg-yellow-300 font-semibold ${soldOut? "cursor-not-allowed opacity-50" : ""}`} >Add to cart</button>
        </div>
      </div>
    </li>
  );
}

MenuItem.propTypes = {
  pizza: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    unitPrice: PropTypes.number.isRequired,
    ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
    soldOut: PropTypes.bool.isRequired,
    imageUrl: PropTypes.string.isRequired,
  }).isRequired,
};
export default MenuItem;
