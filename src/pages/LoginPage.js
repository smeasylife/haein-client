import React, { useEffect } from 'react';
import { initKakao, loginWithKakao, fetchKakaoProfile } from '../utils/kakao';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();

  useEffect(() => {
    initKakao(); // SDK 초기화
  }, []);

  const handleKakaoLogin = async () => {
    try {
      const authObj = await loginWithKakao();
      // authObj.access_token 을 백엔드로 전달해 회원가입/로그인 처리
      // 예: await api.post('/auth/kakao', { token: authObj.access_token });

      // (선택) 프론트에서 바로 프로필 정보 조회
      const profile = await fetchKakaoProfile();
      console.log('카카오 사용자 프로필', profile);

      // 로그인 성공 후 메인 페이지로 이동
      navigate('/');
    } catch (err) {
      console.error('카카오 로그인 실패', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full bg-white shadow-sm z-50">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
          <button
            onClick={() => window.location.href = '/'}
            className="text-gray-700 hover:text-gray-900 font-medium"
          >
            ← 메인으로
          </button>
          <h1 className="text-lg font-bold text-gray-900">HAEIN</h1>
          <div className="w-24" /> {/* Placeholder for centering */}
        </div>
      </header>

      {/* Content */}
      <main className="pt-20 flex flex-col items-center px-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">로그인</h2>

          {/* Social Login */}
          <button
            onClick={handleKakaoLogin}
            className="w-full flex items-center justify-center bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium px-4 py-2 rounded mb-4"
          >
            <img
              src="/assets/kakao-logo.jpg"
              alt="Kakao"
              className="w-5 h-5 mr-2"
            />
            카카오로 로그인
          </button>

          {/* Divider */}
          <div className="flex items-center my-4">
            <div className="flex-grow h-px bg-gray-200" />
            <span className="px-2 text-gray-400 text-sm">또는</span>
            <div className="flex-grow h-px bg-gray-200" />
          </div>

          {/* Login Form */}
          <form className="space-y-4">
            <div>
              <label htmlFor="userId" className="block text-sm font-medium text-gray-700 mb-1">
                아이디
              </label>
              <input
                id="userId"
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="아이디를 입력하세요"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                비밀번호
              </label>
              <input
                id="password"
                type="password"
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="비밀번호를 입력하세요"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white font-medium py-2 rounded hover:bg-gray-800"
            >
              로그인
            </button>
          </form>

          {/* Links */}
          <div className="flex justify-between text-sm text-gray-500 mt-4">
            <button className="hover:text-gray-700">아이디 찾기</button>
            <button className="hover:text-gray-700">비밀번호 찾기</button>
            <button className="hover:text-gray-700">회원가입</button>
          </div>
        </div>
      </main>
    </div>
  );
}
