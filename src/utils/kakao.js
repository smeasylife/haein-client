export function initKakao() {
  try {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      const jsKey = process.env.REACT_APP_KAKAO_JS_KEY;
      if (!jsKey) {
        console.warn('Kakao JS Key가 설정되지 않았습니다.');
        return;
      }
      window.Kakao.init(jsKey);
    }
  } catch (error) {
    console.error('Kakao SDK 초기화 실패:', error);
  }
}

// 카카오 로그인 요청
export function loginWithKakao() {
  return new Promise((resolve, reject) => {
    if (!window.Kakao || !window.Kakao.Auth) {
      reject(new Error('Kakao SDK가 초기화되지 않았습니다.'));
      return;
    }
    window.Kakao.Auth.login({
      scope: 'profile_nickname, account_email',
      success: authObj => {
        // 로그인 토큰까지 받아옴
        resolve(authObj);
      },
      fail: err => {
        reject(err); 
      },
    });
  });
}

// 사용자 정보 가져오기
export function fetchKakaoProfile() {
  return new Promise((resolve, reject) => {
    if (!window.Kakao || !window.Kakao.API) {
      reject(new Error('Kakao SDK가 초기화되지 않았습니다.'));
      return;
    }
    window.Kakao.API.request({
      url: '/v2/user/me',
      success: res => resolve(res),
      fail: err => reject(err),
    });
  });
}