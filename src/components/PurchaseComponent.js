import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PurchaseComponent({ product, onClose }) {
  // product.colors가 존재하고 비어있지 않은지 확인, 그렇지 않으면 null 또는 기본값 설정
  const [selectedColor, setSelectedColor] = useState(product.colors && product.colors.length > 0 ? product.colors[0] : null);
  // product.size에 대한 유사한 확인
  const [selectedSize, setSelectedSize] = useState(product.size && product.size.length > 0 ? product.size[0] : null);
  const [quantity, setQuantity] = useState(1);
  const [animation, setAnimation] = useState('animate-slide-up');
  const navigate = useNavigate();

  useEffect(() => {
    // 컴포넌트가 나타날 때 body 스크롤을 막습니다.
    document.body.style.overflow = 'hidden';
    return () => {
      // 컴포넌트가 사라질 때 body 스크롤을 복원합니다.
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleClose = () => {
    setAnimation('animate-slide-down');
    setTimeout(onClose, 300); // 애니메이션 시간과 일치
  };

  const handleQuantityChange = (amount) => {
    setQuantity(prev => Math.max(1, prev + amount));
  };

  const totalPrice = product.price * quantity;

  const handlePurchase = () => {
    if (!selectedColor) {
      alert('색상을 선택해주세요.');
      return;
    }
    if (!selectedSize) {
      alert('사이즈를 선택해주세요.');
      return;
    }
    // TODO: 주문 페이지 구현 필요
    navigate('/order', {
      state: {
        product,
        selectedColor,
        selectedSize,
        quantity,
        totalPrice,
      },
    });
  };

  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end" onClick={handleClose}>
      <div
        className={`w-full max-w-screen-lg mx-auto bg-white rounded-t-2xl p-6 ${animation}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">옵션 선택</h2>
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* 선택된 옵션 요약 (있을 경우) */}
        <div className="space-y-3 bg-gray-50 p-4 rounded-lg mb-6">
            <div className="flex justify-between items-center">
                <div className="flex-grow">
                    <p className="font-semibold text-sm">{product.name}</p>
                    <p className="text-xs text-gray-500">색상: {selectedColor} / 사이즈: {selectedSize}</p>
                </div>
                <div className="flex items-center border rounded-md bg-white">
                    <button onClick={() => handleQuantityChange(-1)} className="px-3 py-1 text-lg text-gray-600 hover:bg-gray-100 rounded-l-md">-</button>
                    <span className="px-4 py-1 text-center text-sm font-medium">{quantity}</span>
                    <button onClick={() => handleQuantityChange(1)} className="px-3 py-1 text-lg text-gray-600 hover:bg-gray-100 rounded-r-md">+</button>
                </div>
                <p className="text-right font-bold text-sm w-24">{(product.price * quantity).toLocaleString()}원</p>
            </div>
        </div>

        {/* Color Options */}
        <div className="mb-4">
          <h4 className="font-semibold mb-3 text-gray-800">색상</h4>
          <div className="flex flex-wrap gap-2">
            {product.colors.map(color => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`px-4 py-2 rounded-md text-sm border-2 transition-all duration-200 ${selectedColor === color ? 'border-black font-semibold' : 'border-gray-200 text-gray-600'}`}
              >
                {color} 
              </button>
            ))}
          </div>
        </div>

        {/* Size Options */}
        {product.size && (
          <div className="mb-8">
            <h4 className="font-semibold mb-3 text-gray-800">사이즈</h4>
            <div className="flex flex-wrap gap-2">
              {product.size.map(s => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`px-4 py-2 rounded-md text-sm border-2 transition-all duration-200 ${selectedSize === s ? 'border-black font-semibold' : 'border-gray-200 text-gray-600'}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Total Price & Purchase Button */}
        <div className="flex justify-between items-center pt-4 border-t">
          <div>
            <p className="text-sm text-gray-600">총 상품 금액</p>
            <p className="text-2xl font-bold text-red-500">{totalPrice.toLocaleString()}원</p>
          </div>
          <button
            onClick={handlePurchase}
            className="w-1/2 py-4 bg-black text-white rounded-lg hover:bg-gray-800 transition text-lg font-bold"
          >
            구매하기
          </button>
        </div>
      </div>
    </div>
  );
}
