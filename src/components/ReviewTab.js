import React from 'react';
import ReviewItem from './ReviewItem';
import reviewsData from '../reviews'; // 임시 데이터 가져오기

export default function ReviewTab() {
  // 실제 앱에서는 props로 받거나 API 호출을 통해 데이터를 가져옵니다.
  const reviews = reviewsData;

  return (
    <div className="max-w-screen-lg mx-auto py-8 px-4">
      <h2 className="text-2xl font-bold mb-2">리뷰 ({reviews.length})</h2>
      <p className="text-sm text-gray-500 mb-6">실제 구매 고객님들이 작성하신 리뷰입니다.</p>
      
      {/* 리뷰 통계 (선택 사항) */}
      {/* 예: <ReviewStats stats={...} /> */}

      {/* 리뷰 목록 */}
      <ul>
        {reviews.map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))}
      </ul>

      {/* 페이지네이션 (선택 사항) */}
      {/* 예: <Pagination ... /> */}
    </div>
  );
}