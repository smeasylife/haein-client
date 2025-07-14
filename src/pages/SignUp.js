// src/pages/SignupPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignupPage() {
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    // TODO: 백엔드에 회원가입 요청 로직 추가
    // 예: await api.post('/auth/signup', { userId, password, confirmPassword });
    navigate('/login'); // 가입 후 로그인 페이지로 이동 예시
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full bg-white shadow-sm z-50">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
          <button
            onClick={() => navigate('/')}
            className="text-gray-700 hover:text-gray-900 font-medium text-2xl leading-none"
          >
            ← 
          </button>
          <h1 className="text-lg font-bold text-gray-900">HAEIN</h1>
          <div className="w-24" /> {/* 중앙정렬용 빈 박스 */}
        </div>
      </header>

      {/* Content */}
      <main className="pt-20 flex flex-col items-center px-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
            회원가입
          </h2>

          <form className="space-y-4" onSubmit={handleSignup}>
            <div>
              <label htmlFor="userId" className="block text-sm font-medium text-gray-700 mb-1">
                아이디
              </label>
              <input
                id="userId"
                name="userId"
                type="text"
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                placeholder="아이디를 입력하세요"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                비밀번호
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                placeholder="비밀번호를 입력하세요"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                비밀번호 확인
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                placeholder="비밀번호를 다시 입력하세요"
              />
            </div>

            <button
              type="submit"
              className="
                w-full
                bg-white text-black
                border border-gray-300
                font-medium
                py-2
                rounded-lg
                hover:bg-gray-100
                transition-colors duration-150
              "
            >
              회원가입
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
