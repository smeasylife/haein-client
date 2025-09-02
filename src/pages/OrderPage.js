import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/NavBar';

const OrderPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [shippingInfo, setShippingInfo] = useState({ name: '', phone: '', postCode: '', address: '', detailAddress: '' });
  const [points, setPoints] = useState(0);
  const [coupon, setCoupon] = useState(0);

  useEffect(() => {
    if (!state || !state.product) {
      alert('잘못된 접근입니다. 상품 선택 페이지로 돌아갑니다.');
      navigate(-1); // 이전 페이지로 돌아가기
    }
  }, [state, navigate]);

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
    return null; // 리디렉션 중에는 아무것도 렌더링하지 않음
  }

  const { product, selectedColor, selectedSize, quantity, totalPrice } = state;
  const shippingCost = totalPrice >= 50000 ? 0 : 3000; // 5만원 이상 구매 시 무료 배송
  const finalPrice = totalPrice - points - coupon + shippingCost;

  const handlePayment = () => {
    const orderDetails = {
      productInfo: {
        name: product.name,
        options: `색상: ${selectedColor} / 사이즈: ${selectedSize}`,
        quantity,
      },
      shippingInfo,
      paymentDetails: {
        totalPrice,
        shippingCost,
        pointsUsed: points,
        couponDiscount: coupon,
        finalPrice,
      }
    };
    // 실제 PG사 연동 대신 alert로 대체
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
          
          {/* Left Column: Forms */}
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

          {/* Right Column: Summary */}
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
              <div className="space-y-3">
                <div className="flex justify-between text-gray-700"><span>총 상품 금액</span><span>{totalPrice.toLocaleString()}원</span></div>
                <div className="flex justify-between text-gray-700"><span>배송비</span><span>{shippingCost.toLocaleString()}원</span></div>
                <div className="flex justify-between items-center"><span>쿠폰 할인</span><input type="number" step="100" onChange={e => setCoupon(Number(e.target.value) || 0)} className="w-28 text-right border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black" /></div>
                <div className="flex justify-between items-center"><span>적립금 사용</span><input type="number" step="100" onChange={e => setPoints(Number(e.target.value) || 0)} className="w-28 text-right border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black" /></div>
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
