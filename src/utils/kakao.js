export function initKakao() {
    if (window.Kakao && !window.Kakao.isInitialized()) {
    window.Kakao.init(process.env.REACT_APP_KAKAO_JS_KEY);
  }
}

// 카카오 로그인 요청
export function loginWithKakao() {
  return new Promise((resolve, reject) => {
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
    window.Kakao.API.request({
      url: '/v2/user/me',
      success: res => resolve(res),
      fail: err => reject(err),
    });
  });
}