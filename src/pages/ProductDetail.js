// src/pages/ProductDetail.js
import React, { useState, useContext, useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import { useParams, useNavigate } from 'react-router-dom';
import products from '../products';
import HamburgerMenu from '../components/HamburgerMenu';
import Navbar from '../components/NavBar';
import DetailTab from '../components/DetailTab';
import InfoTab from '../components/InfoTab';
import QnATab from '../components/QnATab';
import ReviewTab from '../components/ReviewTab';
import PurchaseComponent from '../components/PurchaseComponent';
import { initKakao } from '../utils/kakao';
import kakaoIcon from '../assets/kakao.jpg';

export default function ProductDetail() {
  const { addToCart } = useContext(CartContext);
  const { id } = useParams();
  const idx = parseInt(id, 10);
  const product = products[idx];
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuItems = ['NEW', 'BEST', 'SALE', '봄/가을', '여름', '겨울'];
  const [activeTab, setActiveTab] = useState('detail');
  const [shareOpen, setShareOpen] = useState(false);
  const [isPurchaseModalOpen, setPurchaseModalOpen] = useState(false);

  useEffect(() => {
    initKakao();
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
      .then(() => {
        alert('링크가 클립보드에 복사되었습니다.');
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
        alert('링크 복사에 실패했습니다.');
      });
    setShareOpen(false);
  };

  const shareOnKakao = () => {
    if (window.Kakao && product) {
      window.Kakao.Link.sendDefault({
        objectType: 'feed',
        content: {
          title: product.name,
          description: `${product.price.toLocaleString()}원`,
          imageUrl: product.image,
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
        buttons: [
          {
            title: '상품 보러가기',
            link: {
              mobileWebUrl: window.location.href,
              webUrl: window.location.href,
            },
          },
        ],
      });
    }
    setShareOpen(false);
  };

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const goToPrevious = () => {
    const imageUrls = product?.imageUrls || product?.detailImages || (product ? [product.image] : []);
    setCurrentImageIndex(prevIndex =>
      prevIndex === 0 ? imageUrls.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    const imageUrls = product?.imageUrls || product?.detailImages || (product ? [product.image] : []);
    setCurrentImageIndex(prevIndex =>
      (prevIndex + 1) % imageUrls.length
    );
  };

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

  const discountRate = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

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

  const detailImages = product.detailImages || [product.image];
  const shippingInfo = product.shippingInfo || '결제 확인 후 1~2일 이내 발송됩니다.';
  const contactInfo  = product.contactInfo  || 'cs@haein.co.kr';
  const qnaList      = product.qnaList      || [];
  const reviewList   = product.reviewList   || [];
  
  // product가 존재하므로 안전하게 imageUrls 정의
  const imageUrls = product.imageUrls || product.detailImages || [product.image];

  return (
    <main className="min-h-screen bg-white px-4 md:px-8 pt-20 pb-10">
      <Navbar onBurgerClick={() => setMenuOpen(true)} />
      <HamburgerMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        menuItems={menuItems}
      />

      <div className="max-w-screen-lg mx-auto flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2 relative shadow rounded-lg overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
          >
            {imageUrls.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`${product.name} ${index + 1}`}
                className="w-full h-auto object-cover flex-shrink-0"
              />
            ))}
          </div>
          {imageUrls.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white bg-opacity-60 rounded-full p-1.5 text-gray-800 hover:bg-opacity-80 transition-all duration-300 ease-in-out hover:scale-110"
                aria-label="Previous image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={goToNext}
                className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white bg-opacity-60 rounded-full p-1.5 text-gray-800 hover:bg-opacity-80 transition-all duration-300 ease-in-out hover:scale-110"
                aria-label="Next image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </div>

        <div className="md:w-1/2 flex flex-col">
          <h1 className="text-3xl font-bold">{product.name}</h1>

          {description.length > 0 && (
            <ul className="list-disc list-inside mt-4 text-gray-700 space-y-1">
              {description.map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          )}

          {size.length > 0 && (
            <div className="mt-6">
              <h2 className="font-semibold mb-1">Size</h2>
              <p className="text-gray-600">{size.join(' / ')}</p>
            </div>
          )}

          {fabric && (
            <div className="mt-4">
              <h2 className="font-semibold mb-1">Fabric</h2>
              <p className="text-gray-600">{fabric}</p>
            </div>
          )}

          {information.length > 0 && (
            <div className="mt-4">
              <h2 className="font-semibold mb-1">Information</h2>
              <p className="text-gray-600">{information.join(' / ')}</p>
            </div>
          )}

          {model && (
            <div className="mt-4">
              <h2 className="font-semibold mb-1">Model</h2>
              <p className="text-gray-600">{model}</p>
            </div>
          )}

          <div className="flex-grow" />

          <div className="mt-6 pt-4 border-t">
            <div className="flex justify-end items-center gap-x-3">
              {discountRate > 0 && (
                <p className="text-2xl font-bold text-red-500">{discountRate}%</p>
              )}
              {product.originalPrice && (
                <p className="text-lg text-gray-400 line-through">
                  {product.originalPrice.toLocaleString()}원
                </p>
              )}
            </div>
            <p className="text-right text-3xl font-extrabold text-gray-800 mt-1">
              {product.price.toLocaleString()}원
            </p>
          </div>

          <div className="mt-4 flex items-stretch gap-2">
            <div className="grid grid-cols-2 gap-4 flex-grow">
              <button
                className="w-full h-full py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
                onClick={() => {
                  addToCart(product);
                  alert(`${product.name}이(가) 장바구니에 담겼습니다.`);
                }}
              >
                장바구니 담기
              </button>
              <button
                className="w-full h-full py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
                onClick={() => setPurchaseModalOpen(true)}
              >
                구매하기
              </button>
            </div>
            <div className="relative">
              <button
                onClick={() => setShareOpen(prev => !prev)}
                className="p-3 h-full border rounded-lg hover:bg-gray-100 transition flex items-center justify-center"
                aria-label="Share product"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8m-4-6l-4-4-4 4m4-4v12" />
                </svg>
              </button>
              {shareOpen && (
                <div className="absolute bottom-full right-0 mb-2 w-48 bg-white border rounded-lg shadow-xl z-10 overflow-hidden">
                  <button
                    onClick={shareOnKakao}
                    className="w-full text-left px-4 py-3 text-sm text-gray-800 hover:bg-gray-100 flex items-center gap-3 transition-colors"
                  >
                    <img src={kakaoIcon} alt="Kakao" className="w-5 h-5" />
                    <span>카카오톡으로 공유</span>
                  </button>
                  <button
                    onClick={handleCopyLink}
                    className="w-full text-left px-4 py-3 text-sm text-gray-800 hover:bg-gray-100 flex items-center gap-3 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                    <span>링크 복사</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-screen-lg mx-auto mt-10">
        <div className="flex border-b">
          {[
            { key: 'detail', label: 'DETAIL' },
            { key: 'info',   label: 'INFO' },
            { key: 'qna',    label: `Q&A (${qnaList.length})` },
            { key: 'review', label: `REVIEW (${reviewList.length})` },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 py-3 text-center text-sm font-medium
                ${activeTab === tab.key
                  ? 'text-gray-900 border-b-2 border-black'
                  : 'text-gray-500 hover:text-gray-700'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-6">
          {activeTab === 'detail' && <DetailTab images={detailImages} />}
          {activeTab === 'info'   && <InfoTab   shipping={shippingInfo} contact={contactInfo} />}
          {activeTab === 'qna'    && <QnATab    qnaList={qnaList} />}
          {activeTab === 'review' && <ReviewTab reviews={reviewList} />}
        </div>
      </div>

      {isPurchaseModalOpen && (
        <PurchaseComponent
          product={product}
          onClose={() => setPurchaseModalOpen(false)}
        />
      )}
    </main>
  );
}
