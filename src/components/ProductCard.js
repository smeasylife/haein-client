import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';

function ProductCard({ image, name, price, colors, index }) {
  const [liked, setLiked] = useState(false);

  const toggleLike = (e) => {
    e.preventDefault(); // 링크 이동 방지
    setLiked(!liked);
  };

  return (
    <Link to={`/product/${index}`} className="block">
      <div className="bg-white transition overflow-hidden border border-gray-200">
        {/* 이미지 영역: flex 비율 7 */}
        <div className="relative flex-[8]">
          <img
            src={image}
            alt={name}
            className="w-full h-auto object-cover"
          />
          <button
            onClick={toggleLike}
            className="absolute top-2 right-2 p-1 rounded-full bg-transparent focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-6 w-6 ${liked ? 'text-red-500' : 'text-transparent'}`}
              fill={liked ? 'currentColor' : 'none'}
              viewBox="0 0 24 24"
              stroke="white"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
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
  index: PropTypes.number.isRequired,
};

export default ProductCard;