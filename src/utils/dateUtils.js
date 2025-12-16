/**
 * 날짜 포맷팅 유틸리티 함수
 */

/**
 * Date 객체를 YYYY-MM-DD 형식으로 변환
 * @param {Date} date - Date 객체
 * @returns {string} YYYY-MM-DD 형식의 날짜 문자열
 */
export function formatDate(date) {
  if (!(date instanceof Date) || isNaN(date)) {
    return '';
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

/**
 * 현재 날짜를 YYYY-MM-DD 형식으로 반환
 * @returns {string} YYYY-MM-DD 형식의 현재 날짜
 */
export function getCurrentDate() {
  return formatDate(new Date());
}

/**
 * 타임스탬프를 YYYY-MM-DD 형식으로 변환
 * @param {number} timestamp - Unix 타임스탬프 (밀리초)
 * @returns {string} YYYY-MM-DD 형식의 날짜 문자열
 */
export function formatTimestamp(timestamp) {
  if (typeof timestamp !== 'number' || timestamp < 0) {
    return '';
  }
  return formatDate(new Date(timestamp));
}

/**
 * 초를 MM:SS 형식으로 변환 (타이머용)
 * @param {number} seconds - 초
 * @returns {string} MM:SS 형식의 시간 문자열
 */
export function formatTimer(seconds) {
  if (typeof seconds !== 'number' || seconds < 0) {
    return '00:00';
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}
