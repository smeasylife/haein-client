import React, { useState, useEffect } from 'react';
import image1 from '../assets/image1.jpg';
import image2 from '../assets/image2.jpg';
import image3 from '../assets/image3.jpg';
import image4 from '../assets/image4.jpg';
import image5 from '../assets/image5.jpg';

const images = [image1, image2, image3, image4, image5];

const Banner = () => {
  // 무한 스크롤을 위해 앞뒤에 이미지 복제
  const extendedImages = [images[images.length - 1], ...images, images[0]];
  const [page, setPage] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const handleTransitionEnd = () => {
    // 마지막 복제 이미지에 도달하면 진짜 첫 번째로 점프
    if (page === extendedImages.length - 1) {
      setIsTransitioning(false);
      setPage(1);
      setTimeout(() => setIsTransitioning(true), 50);
    }
    // 첫 번째 복제 이미지에 도달하면 진짜 마지막으로 점프
    else if (page === 0) {
      setIsTransitioning(false);
      setPage(images.length);
      setTimeout(() => setIsTransitioning(true), 50);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setPage((prev) => prev + 1);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // 인디케이터를 위한 현재 페이지 계산
  const getCurrentPage = () => {
    if (page === 0) return images.length - 1;
    if (page === extendedImages.length - 1) return 0;
    return page - 1;
  };

  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
      {/* 이미지 슬라이더 - 무한 스크롤 */}
      <div
        className={`flex h-full ${isTransitioning ? 'transition-transform duration-500 ease-in-out' : ''}`}
        style={{ transform: `translateX(-${page * 100}%)` }}
        onTransitionEnd={handleTransitionEnd}
      >
        {extendedImages.map((image, index) => (
          <div key={index} className="min-w-full h-full">
            <img
              src={image}
              alt={`banner-${index}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* 인디케이터 (점) */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setIsTransitioning(true);
              setPage(i + 1);
            }}
            className={`w-3 h-3 rounded-full transition-colors ${
              getCurrentPage() === i ? 'bg-white' : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
