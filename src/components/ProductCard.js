import React from "react";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';

function ProductCard({ image, name, price, colors, index }) {
  return (
    <Link to={`/product/${index}`} className="block">
      <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden">
        {/* 이미지 영역: flex 비율 7 */}
        <div className="flex-[8]">
          <img
            src={image}
            alt={name}
            className="w-full h-auto object-cover"
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
// import React from "react";
// import PropTypes from "prop-types";
// import { Link } from "react-router-dom";

// function ProductCard({ image, name, price, colors, index }) {
//   return (
//     <Link to={`/product/${index}`} className="block h-full">
//       <div className="flex flex-col h-full bg-white rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden">
        
//         {/* ─── 1) 세로형 이미지 영역 ─── */}
//         {/* Instagram portrait(4:5) 비율 */}
//         <div className="w-full aspect-[4/5]">
//           <img
//             src={image}
//             alt={name}
//             className="w-full h-full object-cover"
//           />
//         </div>

//         {/* ─── 2) 텍스트 영역 ─── */}
//         <div className="p- flex-1 flex flex-col justify-between">
//           <h3 className="text-lg font-semibold text-gray-800 truncate">
//             {name}
//           </h3>
//           <p className="mt-2 text-base text-gray-600">
//             {price.toLocaleString()}원
//           </p>
//           <div className="flex space-x-2 mt-4">
//             {colors.map((c, i) => (
//               <span
//                 key={i}
//                 className="w-5 h-5 rounded-full border"
//                 style={{ backgroundColor: c }}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// }

// ProductCard.propTypes = {
//   image: PropTypes.string.isRequired,
//   name:   PropTypes.string.isRequired,
//   price:  PropTypes.number.isRequired,
//   colors: PropTypes.arrayOf(PropTypes.string),
// };

// export default ProductCard;
