import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignupPage() {
  const navigate = useNavigate();

  // form state
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // verification state
  const [code, setCode] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState('');

  // countdown timer for 5 minutes (300s)
  useEffect(() => {
    let timerId;
    if (codeSent && timeLeft > 0) {
      timerId = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setCodeSent(false);
    }
    return () => clearInterval(timerId);
  }, [codeSent, timeLeft]);

  const formatTime = (sec) => {
    const m = String(Math.floor(sec / 60)).padStart(2, '0');
    const s = String(sec % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  const sendCode = async () => {
    setError('');
    if (!email) {
      setError('이메일을 입력해주세요.');
      return;
    }
    try {
      // TODO: 백엔드에 인증 코드 발송 요청
      setCodeSent(true);
      setTimeLeft(300);
      setVerified(false);
    } catch (e) {
      setError('인증 코드를 발송할 수 없습니다. 다시 시도해주세요.');
    }
  };

  const verifyCode = async () => {
    setError('');
    setVerifying(true);
    try {
      // TODO: 백엔드에 인증 코드 검증 요청
      setVerified(true); // 임시: 성공 처리
    } catch (e) {
      setError('인증에 실패했습니다. 코드를 확인해주세요.');
    } finally {
      setVerifying(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    if (!verified) {
      setError('이메일 인증을 완료해주세요.');
      return;
    }
    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }
    try {
      // TODO: 백엔드에 회원가입 요청 API 호출
      // await api.post('/auth/signup', { email, nickname, password });
      navigate('/login');
    } catch (e) {
      setError('회원가입에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const isPasswordMatch = password && confirmPassword && password === confirmPassword;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="fixed top-0 left-0 w-full bg-white shadow-sm z-50">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">  
          <button onClick={() => navigate('/')} className="text-gray-700 hover:text-gray-900 font-medium text-2xl leading-none">←</button>
          <h1 className="text-lg font-bold text-gray-900">HAEIN</h1>
          <div className="w-24" />
        </div>
      </header>

      <main className="pt-20 flex flex-col items-center px-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">회원가입</h2>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <form className="space-y-4" onSubmit={handleSignup}>
            {/* Email & Code */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
              <div className="flex space-x-2">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2"
                  placeholder="이메일을 입력하세요"
                />
                <button
                  type="button"
                  onClick={sendCode}
                  disabled={codeSent && timeLeft > 0}
                  className="bg-gray-400 text-white px-4 py-2 rounded disabled:opacity-50"
                >
                  {codeSent && timeLeft > 0 ? formatTime(timeLeft) : '인증번호 발송'}
                </button>
              </div>
            </div>
            <div>
              <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">인증번호</label>
              <div className="flex space-x-2">
                <input
                  id="code"
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  disabled={!codeSent || timeLeft === 0 || verified}
                  className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2"
                  placeholder="인증번호를 입력하세요"
                />
                <button
                  type="button"
                  onClick={verifyCode}
                  disabled={!codeSent || timeLeft === 0 || verifying || verified}
                  className="bg-gray-400 text-white px-4 py-2 rounded disabled:opacity-50"
                >
                  {verified ? '인증완료' : '인증하기'}
                </button>
              </div>
            </div>

            {/* Nickname */}
            <div>
              <label htmlFor="nickname" className="block text-sm font-medium text-gray-700 mb-1">닉네임</label>
              <input
                id="nickname"
                name="nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                type="text"
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2"
                placeholder="닉네임을 입력하세요"
              />
            </div>

            {/* Passwords */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">비밀번호</label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2"
                placeholder="비밀번호를 입력하세요"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">비밀번호 확인</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className={`w-full border ${confirmPassword && !isPasswordMatch ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2 focus:outline-none focus:ring-2`}
                placeholder="비밀번호를 다시 입력하세요"
              />
              {confirmPassword && !isPasswordMatch && (
                <p className="text-red-500 text-sm mt-1">비밀번호가 일치하지 않습니다.</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={!verified || !isPasswordMatch}
              className="
                w-full
                bg-white text-black
                border border-gray-300
                font-medium
                py-2
                rounded-lg
                transition-colors duration-150
                hover:bg-black hover:text-white
                disabled:opacity-50
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
