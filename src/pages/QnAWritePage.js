import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/NavBar';
import HamburgerMenu from '../components/HamburgerMenu';

const QnAWritePage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const menuItems = ['NEW', 'BEST', 'SALE', '봄/가을', '여름', '겨울'];

  const handleSubmit = (e) => {
    e.preventDefault();
    // 실제로는 여기서 API 호출을 통해 서버에 데이터를 전송합니다.
    console.log({ title, content });
    alert('문의가 등록되었습니다.');
    navigate(-1); // 이전 페이지(상품 상세)로 이동
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar onBurgerClick={() => setMenuOpen(true)} />
      <HamburgerMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
      />
      <div className="w-full max-w-screen-lg mx-auto p-4 pt-20">
        <h2 className="text-2xl font-bold mb-6 text-center">문의하기</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-1">제목</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              placeholder="제목을 입력하세요"
              required
            />
          </div>
          <div>
            <label htmlFor="content" className="block text-sm font-semibold text-gray-700 mb-1">내용</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="10"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              placeholder="문의하실 내용을 입력하세요"
              required
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button type="submit" className="bg-gray-800 text-white px-6 py-2 rounded-md font-semibold hover:bg-gray-700">
              등록하기
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default QnAWritePage;
