// src/pages/ProductDetail.js
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import products from '../products';
import HamburgerMenu from '../components/HamburgerMenu';
import Navbar from '../components/NavBar';

export default function ProductDetail() {
  const { id } = useParams();
  const idx = parseInt(id, 10);
  const product = products[idx];
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuItems = ['NEW', 'BEST', 'SALE', '봄/가을', '여름', '겨울'];

  // 제품 객체에 아래 필드를 추가해 주세요:
  // description: string[]
  // size: string[]
  // fabric: string
  // information: string[]
  // model: string
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
  // 예시: 상품 상세정보
  const {
    description = ['부드럽고 가벼운 촉감으로 편안한 숙면을 선사하는 고급 침구 세트입니다.',
  '사계절 내내 쾌적하게 사용할 수 있는 통기성 좋은 소재로 제작되었습니다.',
  '은은한 파스텔 톤의 컬러로 공간을 더욱 화사하고 아늑하게 연출해줍니다.',
  '세탁 후에도 변형이 적으며, 오래도록 새것 같은 느낌을 유지합니다.'],
    size = ['싱글(S)',
  '퀸(Q)',
  '* 실측 사이즈는 ±2cm의 오차가 있을 수 있습니다.'],
    fabric = '순면 100% (Cotton 100%)',
    information = ['두께: 적당함',
  '촉감: 부드러움',
  '안감: 있음',
  '신축성: 없음',
  '세탁 방법: 단독 찬물 세탁 권장'],
    model = '침구 촬영 이미지 기준 퀸(Q) 사이즈를 사용하였습니다.',
  } = product;

  return (
    <main className="min-h-screen bg-white px-4 md:px-8 pt-20 pb-10">
      <Navbar onBurgerClick={() => setMenuOpen(true)} />
      <HamburgerMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        menuItems={menuItems}
      />

      <div className="max-w-screen-lg mx-auto flex flex-col md:flex-row gap-8">
        {/* ─────────────────────────────────────
              1) 좌측: 커다란 상품 이미지
        ───────────────────────────────────── */}
        <div className="md:w-1/2">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto object-cover rounded-lg shadow"
          />
        </div>

        {/* ─────────────────────────────────────
              2) 우측: 상세정보
        ───────────────────────────────────── */}
        <div className="md:w-1/2 flex flex-col">
          {/* 상품명 / 가격 */}
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-2xl text-gray-800 mt-2">
            {product.price.toLocaleString()}원
          </p>

          {/* 간단 설명 (bullet) */}
          {description.length > 0 && (
            <ul className="list-disc list-inside mt-4 text-gray-700 space-y-1">
              {description.map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          )}

          {/* 사이즈 정보 */}
          {size.length > 0 && (
            <div className="mt-6">
              <h2 className="font-semibold mb-1">Size</h2>
              <p className="text-gray-600">
                {size.join(' / ')} 
              </p>
            </div>
          )}

          {/* 원단 정보 */}
          {fabric && (
            <div className="mt-4">
              <h2 className="font-semibold mb-1">Fabric</h2>
              <p className="text-gray-600">{fabric}</p>
            </div>
          )}

          {/* 기타 정보 */}
          {information.length > 0 && (
            <div className="mt-4">
              <h2 className="font-semibold mb-1">Information</h2>
              <p className="text-gray-600">{information.join(' / ')}</p>
            </div>
          )}

          {/* 모델 스펙 */}
          {model && (
            <div className="mt-4">
              <h2 className="font-semibold mb-1">Model</h2>
              <p className="text-gray-600">{model}</p>
            </div>
          )}

          {/* 색상 선택 */}
          <div className="mt-6">
            <h2 className="font-semibold mb-2">Color</h2>
            <div className="flex space-x-3">
              {product.colors.map((c, i) => (
                <button
                  key={i}
                  className="w-8 h-8 rounded-full border-2 transition-transform hover:scale-110"
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          {/* 장바구니 / 구매하기 버튼 */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              className="w-full py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
              onClick={() => alert('장바구니에 담기 로직을 여기에…')}
            >
              장바구니 담기
            </button>
            <button
              className="w-full py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
              onClick={() => alert('구매하기 로직을 여기에…')}
            >
              구매하기
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
