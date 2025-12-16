# Implementation Plan

- [-] 1. 프로젝트 기본 설정 및 유틸리티 함수 구현
  - React 프로젝트 구조 확인 및 필요한 의존성 설치 확인
  - 가격 계산 유틸리티 함수 구현 (할인율, 쿠폰 적용, 적립금 계산)
  - 날짜 포맷팅 유틸리티 함수 구현
  - _Requirements: 1.3, 3.4, 11.1, 11.2_

- [ ]* 1.1 Write property tests for utility functions
  - **Property 2: Discount rate calculation accuracy**
  - **Property 10: Percentage coupon calculation**
  - **Property 11: Fixed coupon calculation**
  - **Validates: Requirements 1.3, 3.4, 11.1, 11.2**

- [ ] 2. Context 및 전역 상태 관리 구현
  - CartContext Provider 구현
  - addToCart, toggleSelect, purchaseSelected, clearCart 함수 구현
  - 장바구니 아이템에 고유 ID 부여 로직 구현
  - _Requirements: 4.1, 4.3, 4.5_

- [ ]* 2.1 Write property tests for CartContext
  - **Property 14: Cart item uniqueness**
  - **Property 16: Selection toggle consistency**
  - **Property 18: Selective cart removal**
  - **Validates: Requirements 4.1, 4.3, 4.5**

- [ ] 3. 공통 컴포넌트 구현
  - Navbar 컴포넌트 구현 (로고, 햄버거 메뉴, 검색, 장바구니 아이콘)
  - HamburgerMenu 컴포넌트 구현 (사이드 메뉴 슬라이드 애니메이션)
  - Banner 컴포넌트 구현
  - _Requirements: 10.1, 10.2, 10.3, 10.5_

- [ ]* 3.1 Write unit tests for navigation components
  - Navbar 렌더링 테스트
  - HamburgerMenu 열기/닫기 테스트
  - _Requirements: 10.1, 10.2, 10.3_

- [ ] 4. 상품 목록 페이지 구현
  - ProductCard 컴포넌트 구현 (이미지, 이름, 가격, 색상 표시)
  - 할인율 계산 및 표시 로직 구현
  - 반응형 그리드 레이아웃 구현 (모바일 2열, 데스크톱 3열)
  - 상품 클릭 시 상세 페이지 네비게이션 구현
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 12.1, 12.2_

- [ ]* 4.1 Write property tests for product display
  - **Property 1: Product card completeness**
  - **Property 3: Product navigation consistency**
  - **Property 4: Responsive grid layout**
  - **Validates: Requirements 1.2, 1.5, 1.4, 12.1, 12.2**

- [ ] 5. 상품 상세 페이지 구현
  - ProductDetail 페이지 컴포넌트 구현
  - 이미지 슬라이더 구현 (이전/다음 버튼)
  - 상품 정보 표시 (설명, 사이즈, 소재, 모델 정보)
  - 가격 및 할인율 표시
  - 탭 네비게이션 구현 (DETAIL, INFO, Q&A, REVIEW)
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_

- [ ]* 5.1 Write property tests for product detail
  - **Property 5: Product detail completeness**
  - **Property 6: Price display completeness**
  - **Property 7: Image navigation availability**
  - **Validates: Requirements 2.3, 2.4, 2.5**

- [ ] 6. 상품 옵션 선택 모달 구현
  - PurchaseComponent 모달 구현
  - 색상 및 사이즈 선택 UI 구현
  - 수량 조절 버튼 구현
  - 쿠폰 선택 드롭다운 구현
  - 적립금 입력 필드 및 전액사용 버튼 구현
  - 실시간 가격 계산 로직 구현
  - 옵션 선택 검증 로직 구현
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6_

- [ ]* 6.1 Write property tests for purchase options
  - **Property 8: Option selection validation**
  - **Property 9: Quantity price invariant**
  - **Property 12: Points usage limit**
  - **Property 13: Purchase data transfer**
  - **Validates: Requirements 3.2, 3.3, 3.5, 3.6**

- [ ] 7. 장바구니 페이지 구현
  - CartPage 컴포넌트 구현
  - 장바구니 아이템 목록 표시
  - 개별 아이템 선택/해제 체크박스 구현
  - 선택된 아이템 총액 계산 및 표시
  - 구매하기 버튼 구현 (선택된 아이템만 처리)
  - 빈 장바구니 상태 처리
  - _Requirements: 4.2, 4.3, 4.4, 4.5_

- [ ]* 7.1 Write property tests for cart functionality
  - **Property 15: Cart display completeness**
  - **Property 17: Selected items total calculation**
  - **Validates: Requirements 4.2, 4.4**

- [ ] 8. 주문/결제 페이지 구현
  - OrderPage 컴포넌트 구현
  - 배송지 정보 입력 폼 구현
  - Daum Postcode API 연동 (주소 검색)
  - 주문 상품 요약 표시
  - 쿠폰 선택 및 적용 로직 구현
  - 적립금 입력 및 검증 로직 구현
  - 배송비 계산 로직 구현 (50,000원 기준)
  - 최종 결제 금액 계산 (쿠폰 → 적립금 → 배송비 순서)
  - 배송지 정보 검증 로직 구현
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 11.5_

- [ ]* 8.1 Write property tests for order calculations
  - **Property 19: Coupon discount application**
  - **Property 20: Points discount application**
  - **Property 21: Shipping cost calculation**
  - **Property 22: Discount order of operations**
  - **Property 23: Shipping information validation**
  - **Property 24: Maximum points auto-fill**
  - **Validates: Requirements 5.3, 5.4, 5.5, 5.6, 11.5, 11.6**

- [ ] 9. Checkpoint - 구매 플로우 테스트
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 10. 회원 인증 페이지 구현
  - LoginPage 컴포넌트 구현
  - 이메일/비밀번호 로그인 폼 구현
  - 카카오 로그인 버튼 및 SDK 연동 구현
  - 아이디/비밀번호 찾기 링크 구현
  - _Requirements: 6.1, 6.2_

- [ ]* 10.1 Write unit tests for login page
  - 로그인 폼 렌더링 테스트
  - 카카오 로그인 버튼 클릭 테스트
  - _Requirements: 6.1, 6.2_

- [ ] 11. 회원가입 페이지 구현
  - SignUpPage 컴포넌트 구현
  - 이메일 인증 코드 발송 기능 구현
  - 5분 타이머 카운트다운 구현
  - 인증 코드 검증 로직 구현
  - 비밀번호 일치 확인 로직 구현
  - 회원가입 폼 제출 검증 구현
  - _Requirements: 6.3, 6.4, 6.5, 6.6, 6.7_

- [ ]* 11.1 Write property tests for signup validation
  - **Property 25: Email verification requirement**
  - **Property 26: Verification timer countdown**
  - **Property 27: Verification code validation**
  - **Property 28: Password match validation**
  - **Validates: Requirements 6.3, 6.4, 6.5, 6.6, 6.7**

- [ ] 12. 리뷰 컴포넌트 구현
  - ReviewTab 컴포넌트 구현
  - ReviewItem 컴포넌트 구현
  - StarRating 컴포넌트 구현 (별점 시각화)
  - AdminComment 컴포넌트 구현
  - 긴 리뷰 텍스트 더보기/접기 기능 구현
  - 리뷰 개수 표시 로직 구현
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

- [ ]* 12.1 Write property tests for review display
  - **Property 29: Review display completeness**
  - **Property 30: Review expansion for long text**
  - **Property 31: Admin comment conditional display**
  - **Property 32: Review count accuracy**
  - **Validates: Requirements 7.2, 7.3, 7.4, 7.5**

- [ ] 13. Q&A 컴포넌트 구현
  - QnATab 컴포넌트 구현
  - Q&A 목록 표시 구현
  - 답변 대기 상태 표시 구현
  - Q&A 개수 표시 로직 구현
  - QnAWritePage 컴포넌트 구현
  - 문의 작성 폼 구현
  - 제목/내용 필수 입력 검증 구현
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6_

- [ ]* 13.1 Write property tests for Q&A functionality
  - **Property 33: Q&A display completeness**
  - **Property 34: Unanswered Q&A indication**
  - **Property 35: Q&A submission validation**
  - **Property 36: Q&A count accuracy**
  - **Validates: Requirements 8.2, 8.3, 8.5, 8.6**

- [ ] 14. 상품 공유 기능 구현
  - 공유 버튼 및 드롭다운 메뉴 구현
  - 카카오톡 공유 기능 구현 (Kakao Link API)
  - 링크 복사 기능 구현 (Clipboard API)
  - 공유 성공 피드백 메시지 구현
  - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5_

- [ ]* 14.1 Write property tests for sharing functionality
  - **Property 37: Kakao share data completeness**
  - **Validates: Requirements 9.3**

- [ ] 15. 검색 기능 구현
  - SearchComponent 구현
  - 검색어 입력 필드 구현
  - 상품 검색 필터링 로직 구현
  - 검색 결과 표시 구현
  - _Requirements: 10.4_

- [ ]* 15.1 Write unit tests for search functionality
  - 검색 입력 테스트
  - 검색 결과 필터링 테스트
  - _Requirements: 10.4_

- [ ] 16. 상세 정보 탭 컴포넌트 구현
  - DetailTab 컴포넌트 구현 (상품 상세 이미지)
  - InfoTab 컴포넌트 구현 (배송 정보, 고객센터)
  - _Requirements: 2.1_

- [ ]* 16.1 Write unit tests for info tabs
  - DetailTab 렌더링 테스트
  - InfoTab 렌더링 테스트
  - _Requirements: 2.1_

- [ ] 17. 반응형 디자인 최적화
  - 모바일 레이아웃 검증 및 조정
  - 데스크톱 레이아웃 검증 및 조정
  - 터치 친화적 UI 요소 크기 조정
  - 주문 페이지 반응형 레이아웃 구현
  - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5_

- [ ]* 17.1 Write property tests for responsive design
  - **Property 38: Order page mobile layout**
  - **Property 39: Order page desktop layout**
  - **Validates: Requirements 12.3, 12.4**

- [ ] 18. 에러 처리 및 사용자 피드백 개선
  - 폼 검증 에러 메시지 표시 구현
  - 네트워크 에러 처리 구현
  - 로딩 상태 표시 구현
  - 성공/실패 알림 메시지 개선
  - _Requirements: All_

- [ ]* 18.1 Write unit tests for error handling
  - 폼 검증 에러 테스트
  - 에러 메시지 표시 테스트
  - _Requirements: All_

- [ ] 19. Final Checkpoint - 전체 기능 테스트
  - Ensure all tests pass, ask the user if questions arise.
