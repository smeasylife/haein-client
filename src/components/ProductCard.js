import React from "react";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';

function ProductCard({ image, name, price, colors, index }) {
  return (
    <Link to={`/product/${index}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition flex flex-col h-80">
        {/* 이미지 영역: flex 비율 7 */}
        <div className="flex-[8]">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* 정보 영역: flex 비율 3 + 위아래 고르게 배치 */}
        <div className="p-3 flex-[2] flex flex-col justify-between">
          {/* 상품명: 한 줄 말줄임 */}
          <h3 className="text-sm font-semibold text-gray-800 truncate">
            {name}
          </h3>

          {/* 가격 */}
          <p className="text-xs text-gray-600">
            {price.toLocaleString()}원
          </p>

          {/* 색상 표시 */}
          <div className="flex space-x-1 mt-1">
            {colors.map((c, i) => (
              <span
                key={i}
                className="w-4 h-4 rounded-full border"
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}

ProductCard.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  colors: PropTypes.arrayOf(PropTypes.string),
};

export default ProductCard;