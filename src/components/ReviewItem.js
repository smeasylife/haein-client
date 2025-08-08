import React, { useState } from 'react';
import PropTypes from 'prop-types';
import StarRating from './StarRating';
import AdminComment from './AdminComment';

const ReviewItem = ({ review }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const MAX_LENGTH = 150; // 더보기를 표시할 글자 수 기준

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const displayText = isExpanded ? review.text : `${review.text.substring(0, MAX_LENGTH)}...`;

  return (
    <li className="border-b py-6">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center space-x-2">
            <StarRating rating={review.rating} />
            <span className="text-xs text-gray-500">({review.rating})</span>
          </div>
          <p className="text-xs text-gray-600 mt-1">
            {review.nickname} | {review.productOption}
          </p>
        </div>
      </div>

      {/* 리뷰 이미지 */}
      <div className="flex space-x-2 mt-4 overflow-x-auto">
        {review.images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`리뷰 이미지 ${index + 1}`}
            className="w-24 h-24 object-cover rounded-md flex-shrink-0"
          />
        ))}
      </div>

      {/* 리뷰 본문 */}
      <div className="mt-4 text-sm text-gray-800">
        <p className="whitespace-pre-wrap">{displayText}</p>
        {review.text.length > MAX_LENGTH && (
          <button
            onClick={toggleExpanded}
            className="text-blue-500 text-sm mt-2"
          >
            {isExpanded ? '접기' : '더보기'}
          </button>
        )}
      </div>

      {/* 관리자 댓글 */}
      <AdminComment comment={review.adminComment} />
    </li>
  );
};

ReviewItem.propTypes = {
  review: PropTypes.object.isRequired,
};

export default ReviewItem;
