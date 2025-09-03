import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/NavBar';

const OrderPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  // Mock data for user's coupons and points - should be fetched from an API in a real app
  const userCoupons = [
    { id: '0', name: '쿠폰 선택 안 함', discount: 0 },
    { id: '1', name: '10% 할인 쿠폰', discount: 0.1 },
    { id: '2', name: '5,000원 할인 쿠폰', discount: 5000 },
  ];
  const userPoints = 10000; // 사용자가 보유한 총 적립금

  const [shippingInfo, setShippingInfo] = useState({ name: '', phone: '', postCode: '', address: '', detailAddress: '' });
  
  // Initialize state from location, with fallbacks
  const initialCouponId = state?.discountDetails?.coupon?.id || '0';
  const initialPointsUsed = state?.discountDetails?.pointsUsed?.toString() || '';

  const [selectedCouponId, setSelectedCouponId] = useState(initialCouponId);
  const [pointsToUse, setPointsToUse] = useState(initialPointsUsed);

  useEffect(() => {
    if (!state || !state.product) {
      alert('잘못된 접근입니다. 상품 선택 페이지로 돌아갑니다.');
      navigate(-1);
    }
  }, [state, navigate]);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const openPostcode = () => {
    if (window.daum && window.daum.Postcode) {
      new window.daum.Postcode({
        oncomplete: function(data) {
          setShippingInfo(prev => ({ ...prev, postCode: data.zonecode, address: data.address }));
        }
      }).open();
    } else {
      alert('주소 검색 서비스를 불러오는 중입니다. 잠시 후 다시 시도해주세요.');
    }
  };

  if (!state || !state.product) {
    return null;
  }

  const { product, selectedColor, selectedSize, quantity } = state;
  
  // Calculations
  const basePrice = product.price * quantity;
  const shippingCost = basePrice >= 50000 ? 0 : 3000;
  const maxPoints = Math.floor(basePrice * 0.05);

  const selectedCoupon = userCoupons.find(c => c.id === selectedCouponId);
  let couponDiscount = 0;
  if (selectedCoupon) {
    if (selectedCoupon.discount < 1 && selectedCoupon.discount > 0) {
      couponDiscount = basePrice * selectedCoupon.discount;
    } else {
      couponDiscount = selectedCoupon.discount;
    }
  }

  const handlePointsChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    const numValue = parseInt(value, 10) || 0;
    const effectiveMaxPoints = Math.min(userPoints, maxPoints);
    setPointsToUse(Math.min(numValue, effectiveMaxPoints).toString());
  };

  const usedPoints = parseInt(pointsToUse, 10) || 0;
  const finalPrice = basePrice - couponDiscount - usedPoints + shippingCost;

  const handlePayment = () => {
    const orderDetails = {
      productInfo: {
        name: product.name,
        options: `색상: ${selectedColor} / 사이즈: ${selectedSize}`,
        quantity,
      },
      shippingInfo,
      paymentDetails: {
        totalPrice: basePrice,
        shippingCost,
        pointsUsed: usedPoints,
        couponDiscount,
        finalPrice,
      }
    };
    alert(`결제 기능 연동이 필요합니다.\n\n주문 정보:\n${JSON.stringify(orderDetails, null, 2)}`);
  };

  const handleInputChange = (setter) => (e) => {
    const { name, value } = e.target;
    setter(prev => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <Navbar />
      <main className="max-w-screen-lg mx-auto p-4 pt-24 pb-12">
        <h1 className="text-3xl font-extrabold mb-8 text-center">주문/결제</h1>
        <div className="flex flex-col lg:flex-row gap-12">
          
          <div className="flex-grow space-y-8">
            <section>
              <h2 className="text-xl font-bold border-b-2 border-black pb-3 mb-4">배송지 정보</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">받는 분</label>
                  <input type="text" name="name" onChange={handleInputChange(setShippingInfo)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">연락처</label>
                  <input type="text" name="phone" onChange={handleInputChange(setShippingInfo)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">주소</label>
                  <div className="flex gap-2 items-center">
                    <input type="text" name="postCode" value={shippingInfo.postCode} placeholder="우편번호" readOnly className="mt-1 block w-1/3 border-gray-300 rounded-md shadow-sm bg-gray-100" />
                    <button onClick={openPostcode} className="mt-1 px-4 py-2 bg-gray-800 text-white text-sm font-medium rounded-md hover:bg-black">주소 검색</button>
                  </div>
                  <input type="text" name="address" value={shippingInfo.address} readOnly className="mt-2 block w-full border-gray-300 rounded-md shadow-sm bg-gray-100" />
                  <input type="text" name="detailAddress" onChange={handleInputChange(setShippingInfo)} placeholder="상세주소를 입력하세요" className="mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black" />
                </div>
              </div>
            </section>
          </div>

          <aside className="lg:w-2/5">
            <div className="sticky top-24 bg-gray-50 p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-bold border-b-2 border-black pb-3 mb-4">결제 요약</h2>
              <div className="flex items-center mb-6 pb-4 border-b">
                <img src={product.image} alt={product.name} className="w-20 h-20 rounded-lg object-cover" />
                <div className="ml-4">
                  <p className="font-semibold text-gray-800">{product.name}</p>
                  <p className="text-sm text-gray-600">색상: {selectedColor} / 사이즈: {selectedSize}</p>
                  <p className="text-sm text-gray-600">수량: {quantity}개</p>
                </div>
              </div>

              {/* Discount Section */}
              <div className="space-y-4 mb-6 pb-4 border-b">
                <div>
                  <h4 className="font-semibold mb-2 text-gray-800">쿠폰 할인</h4>
                  <select 
                    value={selectedCouponId}
                    onChange={e => setSelectedCouponId(e.target.value)}
                    className="w-full p-3 border rounded-md bg-white shadow-sm focus:ring-black focus:border-black"
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
                      className="w-full p-3 border rounded-md shadow-sm focus:ring-black focus:border-black"
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

              {/* Final Price Summary */}
              <div className="space-y-3">
                <div className="flex justify-between text-gray-700"><span>총 상품 금액</span><span>{basePrice.toLocaleString()}원</span></div>
                <div className="flex justify-between text-gray-700"><span>배송비</span><span>{shippingCost > 0 ? `+${shippingCost.toLocaleString()}` : '무료'}원</span></div>
                <div className="flex justify-between text-red-500"><span>쿠폰 할인</span><span>-{couponDiscount.toLocaleString()}원</span></div>
                <div className="flex justify-between text-red-500"><span>적립금 사용</span><span>-{usedPoints.toLocaleString()}원</span></div>
                <div className="flex justify-between font-extrabold text-lg border-t-2 pt-4 mt-4">
                  <span>최종 결제 금액</span>
                  <span className="text-red-500 text-2xl">{finalPrice.toLocaleString()}원</span>
                </div>
              </div>
              <button onClick={handlePayment} className="w-full mt-6 py-3 bg-black text-white rounded-lg text-lg font-bold hover:bg-gray-800 transition-colors">
                결제하기
              </button>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
};

export default OrderPage;
