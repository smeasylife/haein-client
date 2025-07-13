// src/pages/ProductDetail.js
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import products from '../products';

export default function ProductDetail() {
  const { id } = useParams();               // URL에서 :id 추출
  const idx = parseInt(id, 10);
  const product = products[idx];            // 인덱스로 상품 찾기
  const navigate = useNavigate();

  if (!product) {
    return (
      <div className="p-6 text-center">
        <p>상품 정보를 찾을 수 없습니다.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-gray-200 rounded"
        >
          뒤로가기
        </button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white px-6 pt-20">
      {/* 뒤로가기 버튼 */}
      <button
        onClick={() => navigate(-1)}
        className="text-gray-700 hover:underline mb-4"
      >
        ← 뒤로
      </button>

      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-auto object-cover rounded"
        />
        <h1 className="text-3xl font-bold mt-4">{product.name}</h1>
        <p className="text-2xl text-gray-800 my-2">
          {product.price.toLocaleString()}원
        </p>

        {/* 색상 옵션 */}
        <div className="flex space-x-2 my-4">
          {product.colors.map((c, i) => (
            <span
              key={i}
              className="w-6 h-6 rounded-full border"
              style={{ backgroundColor: c }}
            />
          ))}
        </div>

        {/* 구매 버튼 */}
        <button
          className="w-full bg-black text-white py-3 rounded-lg mt-6 hover:bg-gray-800 transition"
          onClick={() => {
            // TODO: 결제 모듈 호출 또는 장바구니 로직
            alert('구매 구현은 여기에…');
          }}
        >
          구매하기
        </button>

        {/* 상세 설명 */}
        <div className="mt-6 text-gray-600">
          <h2 className="text-xl font-semibold mb-2">상품 정보</h2>
          <p>
            {/* 예시 설명 */}
            이 상품은 고급 원단으로 제작되었으며, 세탁 시 찬물에 단독 세탁을 권장합니다.
          </p>
        </div>
      </div>
    </main>
  );
}
