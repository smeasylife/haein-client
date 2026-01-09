import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PurchaseComponent({ product, onClose }) {

  const [selectedColor, setSelectedColor] = useState(product.colors && product.colors.length > 0 ? product.colors[0] : null);
  const [selectedSize, setSelectedSize] = useState(product.size && product.size.length > 0 ? product.size[0] : null);
  const [quantity, setQuantity] = useState(1);
  const [animation, setAnimation] = useState('animate-slide-up');
  const navigate = useNavigate();

  const userCoupons = [
    { id: '0', name: '쿠폰 선택 안 함', discount: 0 },
    { id: '1', name: '10% 할인 쿠폰', discount: 0.1 },
    { id: '2', name: '5,000원 할인 쿠폰', discount: 5000 },
  ];
  const userPoints = 10000;

  const [selectedCouponId, setSelectedCouponId] = useState('0');
  const [pointsToUse, setPointsToUse] = useState('');

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleClose = () => {
    setAnimation('animate-slide-down');
    setTimeout(onClose, 300);
  };

  const handleQuantityChange = (amount) => {
    setQuantity(prev => Math.max(1, prev + amount));
  };

  const basePrice = product.price * quantity;
  const maxPoints = Math.floor(basePrice * 0.05);
  const selectedCoupon = userCoupons.find(c => c.id === selectedCouponId);

  let discount = 0;
  if (selectedCoupon) {
    if (selectedCoupon.discount < 1 && selectedCoupon.discount > 0) {
      discount = basePrice * selectedCoupon.discount;
    } else {
      discount = selectedCoupon.discount;
    }
  }

  const handlePointsChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    const numValue = parseInt(value, 10) || 0;
    const effectiveMaxPoints = Math.min(userPoints, maxPoints);
    setPointsToUse(Math.min(numValue, effectiveMaxPoints).toString());
  };

  const usedPoints = parseInt(pointsToUse, 10) || 0;
  const finalPrice = basePrice - discount - usedPoints;

  const handlePurchase = () => {
    // 옵션이 있는 경우에만 검증
    if (product.colors && product.colors.length > 0 && !selectedColor) {
      alert('색상을 선택해주세요.');
      return;
    }
    if (product.size && product.size.length > 0 && !selectedSize) {
      alert('사이즈를 선택해주세요.');
      return;
    }
    navigate('/order', {
      state: {
        product,
        selectedColor,
        selectedSize,
        quantity,
        totalPrice: finalPrice,
        discountDetails: {
          coupon: selectedCoupon,
          pointsUsed: usedPoints
        }
      },
    });
  };

  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end" onClick={handleClose}>
      <div
        className={`w-full max-w-screen-lg mx-auto bg-white rounded-t-2xl ${animation} flex flex-col`}
        style={{ maxHeight: '90vh' }} // Set a max height
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold">옵션 선택</h2>
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="overflow-y-auto p-6 flex-grow">
          <div className="space-y-3 bg-gray-50 p-4 rounded-lg mb-6">
              <div className="flex justify-between items-center">
                  <div className="flex-grow">
                      <p className="font-semibold text-sm">{product.name}</p>
                      <p className="text-xs text-gray-500">
    {selectedColor && `색상: ${selectedColor}`}
    {selectedColor && selectedSize && ' / '}
    {selectedSize && `사이즈: ${selectedSize}`}
    {!selectedColor && !selectedSize && '기본 옵션'}
</p>
                  </div>
                  <div className="flex items-center border rounded-md bg-white">
                      <button onClick={() => handleQuantityChange(-1)} className="px-3 py-1 text-lg text-gray-600 hover:bg-gray-100 rounded-l-md">-</button>
                      <span className="px-4 py-1 text-center text-sm font-medium">{quantity}</span>
                      <button onClick={() => handleQuantityChange(1)} className="px-3 py-1 text-lg text-gray-600 hover:bg-gray-100 rounded-r-md">+</button>
                  </div>
                  <p className="text-right font-bold text-sm w-24">{basePrice.toLocaleString()}원</p>
              </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {product.colors && product.colors.length > 0 && (
              <div>
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
            )}
            {product.size && product.size.length > 0 && (
              <div>
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
          </div>

          <div className="border-t pt-6 space-y-4">
            <div>
              <h4 className="font-semibold mb-2 text-gray-800">쿠폰 할인</h4>
              <select 
                value={selectedCouponId}
                onChange={e => setSelectedCouponId(e.target.value)}
                className="w-full p-3 border rounded-md bg-gray-50"
              >
                {userCoupons.map(coupon => (
                  <option key={coupon.id} value={coupon.id}>{coupon.name}</option>
                ))}
              </select>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-gray-800">적립금 사용</h4>
              <div className="flex items-center gap-2">
                <input 
                  type="text" 
                  value={pointsToUse}
                  onChange={handlePointsChange}
                  placeholder="0" 
                  className="w-full p-3 border rounded-md"
                />
                <button 
                  onClick={() => setPointsToUse(Math.min(userPoints, maxPoints).toString())} 
                  className="px-4 py-3 bg-gray-200 text-gray-800 rounded-md whitespace-nowrap text-sm font-medium hover:bg-gray-300"
                >
                  전액사용
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                사용 가능 적립금: {Math.min(userPoints, maxPoints).toLocaleString()}원 (보유: {userPoints.toLocaleString()}원)
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center p-6 border-t mt-auto">
          <div>
            <p className="text-sm text-gray-600">총 결제 금액</p>
            <p className="text-3xl font-bold text-red-500">{finalPrice.toLocaleString()}원</p>
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
