import React from "react";
import PropTypes from "prop-types";

function ProductCard({ image, name, price, colors }) {
  return (
    <div className="flex flex-col">
      <div className="aspect-square w-full rounded-xl overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="mt-4 text-base font-medium text-gray-900">{name}</div>
      <div className="mt-1 text-sm text-gray-600">{price.toLocaleString()}원</div>
      {colors && colors.length > 0 && (
        <div className="flex gap-1 mt-2">
          {colors.map((color, idx) => (
            <span
              key={idx}
              className="inline-block w-3 h-3 rounded-full border border-gray-200"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

ProductCard.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  colors: PropTypes.arrayOf(PropTypes.string),
};

export default ProductCard;