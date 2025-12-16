# Design Document

## Overview

Hable 쇼핑몰은 React 기반의 Single Page Application(SPA)으로 구현됩니다. 미니멀한 디자인과 직관적인 사용자 경험을 제공하기 위해 Tailwind CSS를 활용하며, 상태 관리는 React Context API를 사용합니다. 전체적으로 화이트/블랙 톤의 깔끔한 UI를 유지하며, 모바일 우선 반응형 디자인을 적용합니다.

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Browser                               │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              React Application (SPA)                   │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │           Presentation Layer                     │  │  │
│  │  │  - Pages (Home, ProductDetail, Cart, Order...)  │  │  │
│  │  │  - Components (Navbar, ProductCard, Modal...)   │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │           State Management Layer                 │  │  │
│  │  │  - CartContext (장바구니 상태)                   │  │  │
│  │  │  - Local State (컴포넌트별 상태)                │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │           Data Layer                             │  │  │
│  │  │  - Static Data (products.js, reviews.js...)     │  │  │
│  │  │  - API Integration (향후 백엔드 연동)            │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                   External Services                          │
│  - Kakao SDK (로그인, 공유)                                  │
│  - Daum Postcode API (주소 검색)                             │
│  - Backend API (향후 구현)                                   │
└─────────────────────────────────────────────────────────────┘
```

### Technology Stack

- **Frontend Framework**: React 19.1.0
- **Routing**: React Router DOM 6.30.1
- **Styling**: Tailwind CSS 3.4.17
- **Icons**: Heroicons 2.2.0
- **Animation**: Framer Motion 12.23.0
- **State Management**: React Context API
- **Build Tool**: Create React App (react-scripts 5.0.1)
- **Testing**: Jest, React Testing Library

## Components and Interfaces

### Core Components

#### 1. Navigation Components

**Navbar**
- Props: `onBurgerClick: () => void`
- State: `showSearch: boolean`
- Responsibilities:
  - 상단 고정 네비게이션 바 렌더링
  - 햄버거 메뉴, 로고, 검색, 장바구니 아이콘 표시
  - 카테고리 탭 표시 (NEW, BEST, SALE, 봄/가을, 여름, 겨울)
  - 검색 컴포넌트 토글

**HamburgerMenu**
- Props: `isOpen: boolean`, `onClose: () => void`, `menuItems: string[]`
- Responsibilities:
  - 사이드 메뉴 슬라이드 애니메이션
  - 카테고리 메뉴 항목 표시
  - 오버레이 클릭 시 닫기

**SearchComponent**
- Props: `onClose: () => void`
- Responsibilities:
  - 전체 화면 검색 인터페이스
  - 검색어 입력 및 필터링
  - 검색 결과 표시

#### 2. Product Components

**ProductCard**
- Props: `index: number`, `image: string`, `name: string`, `originalPrice: number`, `price: number`, `colors: string[]`
- Responsibilities:
  - 상품 썸네일 이미지 표시
  - 상품명, 가격, 할인율 표시
  - 색상 옵션 미리보기
  - 클릭 시 상품 상세 페이지로 이동

**ProductDetail (Page)**
- State: `currentImageIndex: number`, `activeTab: string`, `shareOpen: boolean`, `isPurchaseModalOpen: boolean`
- Responsibilities:
  - 상품 이미지 슬라이더
  - 상품 상세 정보 표시 (설명, 사이즈, 소재, 모델 정보)
  - 가격 및 할인율 표시
  - 장바구니 담기 / 구매하기 버튼
  - 공유 기능 (카카오톡, 링크 복사)
  - 탭 네비게이션 (DETAIL, INFO, Q&A, REVIEW)

**PurchaseComponent (Modal)**
- Props: `product: Product`, `onClose: () => void`
- State: `selectedColor: string`, `selectedSize: string`, `quantity: number`, `selectedCouponId: string`, `pointsToUse: string`
- Responsibilities:
  - 상품 옵션 선택 (색상, 사이즈)
  - 수량 조절
  - 쿠폰 선택 및 적립금 입력
  - 실시간 가격 계산
  - 주문 페이지로 데이터 전달

#### 3. Cart Components

**CartPage**
- Context: `CartContext`
- Responsibilities:
  - 장바구니 아이템 목록 표시
  - 개별 아이템 선택/해제
  - 선택된 아이템 총액 계산
  - 구매하기 버튼 (선택된 아이템만)
  - 빈 장바구니 상태 처리

#### 4. Order Components

**OrderPage**
- State: `shippingInfo: ShippingInfo`, `selectedCouponId: string`, `pointsToUse: string`
- Responsibilities:
  - 배송지 정보 입력 폼
  - Daum Postcode API 연동 (주소 검색)
  - 주문 상품 요약 표시
  - 쿠폰 및 적립금 적용
  - 배송비 계산 (50,000원 이상 무료)
  - 최종 결제 금액 계산
  - 결제 처리 (향후 PG 연동)

#### 5. Authentication Components

**LoginPage**
- Responsibilities:
  - 이메일/비밀번호 로그인 폼
  - 카카오 소셜 로그인 버튼
  - 아이디/비밀번호 찾기 링크
  - 회원가입 페이지로 이동

**SignUpPage**
- State: `email: string`, `nickname: string`, `password: string`, `confirmPassword: string`, `code: string`, `codeSent: boolean`, `timeLeft: number`, `verified: boolean`
- Responsibilities:
  - 이메일 인증 코드 발송
  - 5분 타이머 카운트다운
  - 인증 코드 검증
  - 비밀번호 일치 확인
  - 회원가입 폼 제출

#### 6. Review Components

**ReviewTab**
- Props: `reviews: Review[]`
- Responsibilities:
  - 리뷰 목록 표시
  - 리뷰 개수 표시

**ReviewItem**
- Props: `review: Review`
- State: `expanded: boolean`
- Responsibilities:
  - 리뷰 작성자, 평점, 옵션 표시
  - 리뷰 이미지 갤러리
  - 긴 텍스트 더보기/접기
  - 관리자 댓글 표시

**StarRating**
- Props: `rating: number`
- Responsibilities:
  - 별점 시각화 (1-5점)

**AdminComment**
- Props: `author: string`, `text: string`
- Responsibilities:
  - 관리자 답변 표시

#### 7. Q&A Components

**QnATab**
- Props: `qnaList: QnA[]`
- Responsibilities:
  - Q&A 목록 표시
  - 문의하기 버튼
  - Q&A 개수 표시

**QnAWritePage**
- State: `title: string`, `content: string`
- Responsibilities:
  - 문의 제목 및 내용 입력 폼
  - 문의 등록 처리

#### 8. Info Components

**DetailTab**
- Props: `images: string[]`
- Responsibilities:
  - 상품 상세 이미지 표시

**InfoTab**
- Props: `shipping: string`, `contact: string`
- Responsibilities:
  - 배송 정보 표시
  - 고객센터 연락처 표시

#### 9. Common Components

**Banner**
- Responsibilities:
  - 메인 페이지 배너 이미지 표시
  - 프로모션 정보 표시

## Data Models

### Product

```typescript
interface Product {
  image: string;                    // 메인 이미지 URL
  imageUrls?: string[];             // 추가 이미지 URL 배열
  name: string;                     // 상품명
  originalPrice: number;            // 정가
  price: number;                    // 판매가
  colors: string[];                 // 색상 옵션 배열
  size?: string[];                  // 사이즈 옵션 배열 (선택적)
  description?: string[];           // 상품 설명 배열
  fabric?: string;                  // 소재 정보
  information?: string[];           // 추가 정보 배열
  model?: string;                   // 모델 정보
  detailImages?: string[];          // 상세 이미지 배열
  shippingInfo?: string;            // 배송 정보
  contactInfo?: string;             // 고객센터 정보
  qnaList?: QnA[];                  // Q&A 목록
  reviewList?: Review[];            // 리뷰 목록
}
```

### CartItem

```typescript
interface CartItem extends Product {
  cartItemId: number;               // 장바구니 아이템 고유 ID (Date.now())
  isSelected: boolean;              // 선택 상태
}
```

### Review

```typescript
interface Review {
  id: number;                       // 리뷰 ID
  nickname: string;                 // 작성자 닉네임
  rating: number;                   // 평점 (1-5)
  productOption: string;            // 선택한 상품 옵션
  images: string[];                 // 리뷰 이미지 배열
  text: string;                     // 리뷰 내용
  adminComment: AdminComment | null; // 관리자 댓글
}

interface AdminComment {
  author: string;                   // 관리자 이름
  text: string;                     // 댓글 내용
}
```

### QnA

```typescript
interface QnA {
  id: number;                       // Q&A ID
  title: string;                    // 문의 제목
  author: string;                   // 작성자 (마스킹 처리)
  date: string;                     // 작성일 (YYYY-MM-DD)
  question: string;                 // 문의 내용
  answer: string | null;            // 답변 내용 (미답변 시 null)
}
```

### ShippingInfo

```typescript
interface ShippingInfo {
  name: string;                     // 받는 사람 이름
  phone: string;                    // 연락처
  postCode: string;                 // 우편번호
  address: string;                  // 주소
  detailAddress: string;            // 상세 주소
}
```

### Coupon

```typescript
interface Coupon {
  id: string;                       // 쿠폰 ID
  name: string;                     // 쿠폰 이름
  discount: number;                 // 할인 (0-1: 비율, 1 이상: 고정 금액)
}
```

### OrderState

```typescript
interface OrderState {
  product: Product;                 // 주문 상품
  selectedColor: string;            // 선택한 색상
  selectedSize: string;             // 선택한 사이즈
  quantity: number;                 // 수량
  totalPrice: number;               // 총 가격
  discountDetails: {
    coupon: Coupon;                 // 사용한 쿠폰
    pointsUsed: number;             // 사용한 적립금
  };
}
```

## Data Models


## Context Management

### CartContext

```typescript
interface CartContextType {
  cart: CartItem[];                 // 장바구니 아이템 배열
  addToCart: (product: Product) => void;
  toggleSelect: (cartItemId: number) => void;
  purchaseSelected: () => void;
  clearCart: () => void;
}
```

**State Management Strategy:**
- 장바구니 상태는 전역 Context로 관리
- 각 아이템에 고유 ID 부여 (Date.now())
- 선택 상태는 개별 아이템에 저장
- 구매 완료 시 선택된 아이템만 제거

### Local State Management

각 컴포넌트는 필요에 따라 로컬 상태를 관리:
- UI 상태 (모달 열림/닫힘, 탭 선택 등)
- 폼 입력 상태 (배송지 정보, 검색어 등)
- 임시 계산 값 (할인 금액, 최종 가격 등)

## Error Handling

### Client-Side Validation

1. **폼 입력 검증**
   - 필수 필드 확인
   - 이메일 형식 검증
   - 비밀번호 일치 확인
   - 적립금 사용 한도 검증

2. **상품 옵션 검증**
   - 색상/사이즈 선택 확인
   - 수량 최소값 검증 (1개 이상)

3. **결제 정보 검증**
   - 배송지 정보 완성도 확인
   - 쿠폰 적용 가능 여부 확인
   - 적립금 사용 가능 금액 확인

### Error Display Strategy

- **Alert 사용**: 간단한 성공/실패 메시지
- **Inline Error**: 폼 필드 아래 에러 메시지 표시
- **Toast Notification**: 향후 구현 시 사용자 친화적 알림

### API Error Handling (향후 구현)

```typescript
try {
  const response = await api.post('/endpoint', data);
  // 성공 처리
} catch (error) {
  if (error.response) {
    // 서버 응답 에러 (4xx, 5xx)
    handleServerError(error.response.status);
  } else if (error.request) {
    // 네트워크 에러
    showNetworkError();
  } else {
    // 기타 에러
    showGenericError();
  }
}
```

## Testing Strategy

### Unit Testing

**테스트 대상:**
- 유틸리티 함수 (가격 계산, 할인율 계산)
- Context Provider (장바구니 로직)
- 개별 컴포넌트 렌더링

**테스트 도구:**
- Jest: 테스트 러너
- React Testing Library: 컴포�트 테스트
- @testing-library/user-event: 사용자 인터랙션 시뮬레이션

**예시 테스트 케이스:**
```javascript
// 할인율 계산 테스트
test('calculates discount rate correctly', () => {
  const originalPrice = 32000;
  const salePrice = 29000;
  const discountRate = calculateDiscountRate(originalPrice, salePrice);
  expect(discountRate).toBe(9);
});

// 장바구니 추가 테스트
test('adds product to cart with unique ID', () => {
  const { result } = renderHook(() => useContext(CartContext));
  act(() => {
    result.current.addToCart(mockProduct);
  });
  expect(result.current.cart).toHaveLength(1);
  expect(result.current.cart[0].cartItemId).toBeDefined();
});
```

### Integration Testing

**테스트 시나리오:**
- 상품 선택 → 옵션 선택 → 장바구니 담기 플로우
- 장바구니 → 주문 → 결제 플로우
- 회원가입 → 이메일 인증 → 로그인 플로우

### E2E Testing (향후 구현)

**도구:** Cypress 또는 Playwright
**테스트 시나리오:**
- 전체 구매 프로세스
- 소셜 로그인 플로우
- 반응형 디자인 검증


## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Product Display Properties

**Property 1: Product card completeness**
*For any* Product displayed in a card, the rendered output should include image, name, original price, sale price, and color options.
**Validates: Requirements 1.2**

**Property 2: Discount rate calculation accuracy**
*For any* Product with an original price and sale price, the calculated discount rate should equal `Math.round(((originalPrice - salePrice) / originalPrice) * 100)`.
**Validates: Requirements 1.3**

**Property 3: Product navigation consistency**
*For any* Product card clicked, the system should navigate to the detail page with the correct product index in the URL.
**Validates: Requirements 1.5**

**Property 4: Responsive grid layout**
*For any* viewport width, the product grid should display 2 columns when width < 768px and 3 columns when width >= 768px.
**Validates: Requirements 1.4, 12.1, 12.2**

### Product Detail Properties

**Property 5: Product detail completeness**
*For any* Product on the detail page, the system should display description, size options, fabric information, and model information when these fields exist.
**Validates: Requirements 2.3**

**Property 6: Price display completeness**
*For any* Product on the detail page, the system should display original price, sale price, and calculated discount rate.
**Validates: Requirements 2.4**

**Property 7: Image navigation availability**
*For any* Product with multiple images (imageUrls.length > 1), the system should render previous and next navigation buttons.
**Validates: Requirements 2.5**

### Purchase and Options Properties

**Property 8: Option selection validation**
*For any* purchase attempt, the system should block the transaction if color or size is not selected and display an appropriate error message.
**Validates: Requirements 3.2**

**Property 9: Quantity price invariant**
*For any* quantity change, the total price should always equal `product.price * quantity`.
**Validates: Requirements 3.3**

**Property 10: Percentage coupon calculation**
*For any* percentage coupon (discount < 1 and discount > 0) applied to a base price, the discount amount should equal `basePrice * discount`.
**Validates: Requirements 3.4, 11.1**

**Property 11: Fixed coupon calculation**
*For any* fixed amount coupon (discount >= 1) applied to a base price, the discount amount should equal the coupon's discount value.
**Validates: Requirements 3.4, 11.2**

**Property 12: Points usage limit**
*For any* points entered, the system should limit the usable amount to the minimum of (userPoints, Math.floor(basePrice * 0.05)).
**Validates: Requirements 3.5, 11.3, 11.4**

**Property 13: Purchase data transfer**
*For any* purchase confirmation, the navigation to order page should include product, selectedColor, selectedSize, quantity, and discount details in the state.
**Validates: Requirements 3.6**

### Cart Properties

**Property 14: Cart item uniqueness**
*For any* product added to cart, the system should assign a unique cartItemId using Date.now().
**Validates: Requirements 4.1**

**Property 15: Cart display completeness**
*For any* cart item displayed, the rendered output should include image, name, options, and price.
**Validates: Requirements 4.2**

**Property 16: Selection toggle consistency**
*For any* cart item, toggling selection should change isSelected from true to false or false to true.
**Validates: Requirements 4.3**

**Property 17: Selected items total calculation**
*For any* set of selected cart items, the total price should equal the sum of all selected items' prices.
**Validates: Requirements 4.4**

**Property 18: Selective cart removal**
*For any* purchase action, only cart items with isSelected === true should be removed from the cart.
**Validates: Requirements 4.5**

### Order and Payment Properties

**Property 19: Coupon discount application**
*For any* coupon selected on the order page, the discount should be calculated and subtracted from the base price.
**Validates: Requirements 5.3**

**Property 20: Points discount application**
*For any* valid points amount entered, the points should be subtracted from the price after coupon discount.
**Validates: Requirements 5.4**

**Property 21: Shipping cost calculation**
*For any* order, the shipping cost should be 3000 won when basePrice < 50000 and 0 won when basePrice >= 50000.
**Validates: Requirements 5.5**

**Property 22: Discount order of operations**
*For any* order with both coupon and points, the final price should equal `basePrice - couponDiscount - pointsDiscount + shippingCost`.
**Validates: Requirements 11.5**

**Property 23: Shipping information validation**
*For any* payment attempt, the system should validate that name, phone, postCode, address, and detailAddress are all non-empty.
**Validates: Requirements 5.6**

**Property 24: Maximum points auto-fill**
*For any* "use all points" action, the system should fill in `Math.min(userPoints, Math.floor(basePrice * 0.05))`.
**Validates: Requirements 11.6**

### Authentication Properties

**Property 25: Email verification requirement**
*For any* signup form submission, the system should block submission when verified === false.
**Validates: Requirements 6.3, 6.7**

**Property 26: Verification timer countdown**
*For any* verification code sent, the timer should count down from 300 seconds to 0 at 1-second intervals.
**Validates: Requirements 6.4**

**Property 27: Verification code validation**
*For any* verification code entered, the system should validate the code and set verified to true only when the code is correct.
**Validates: Requirements 6.5**

**Property 28: Password match validation**
*For any* password and confirmPassword pair, the system should validate that they are identical before allowing signup.
**Validates: Requirements 6.6**

### Review Properties

**Property 29: Review display completeness**
*For any* review displayed, the rendered output should include nickname, rating, productOption, images, and text.
**Validates: Requirements 7.2**

**Property 30: Review expansion for long text**
*For any* review with text length exceeding a threshold, the system should provide a "show more" button to expand the full text.
**Validates: Requirements 7.3**

**Property 31: Admin comment conditional display**
*For any* review, the admin comment should be displayed if and only if adminComment is not null.
**Validates: Requirements 7.4**

**Property 32: Review count accuracy**
*For any* product, the review tab label should display the count equal to reviewList.length.
**Validates: Requirements 7.5**

### Q&A Properties

**Property 33: Q&A display completeness**
*For any* Q&A entry displayed, the rendered output should include title, author, date, question, and answer (if available).
**Validates: Requirements 8.2**

**Property 34: Unanswered Q&A indication**
*For any* Q&A entry where answer is null, the system should display a pending response indicator.
**Validates: Requirements 8.3**

**Property 35: Q&A submission validation**
*For any* Q&A submission attempt, the system should require both title and content to be non-empty.
**Validates: Requirements 8.5**

**Property 36: Q&A count accuracy**
*For any* product, the Q&A tab label should display the count equal to qnaList.length.
**Validates: Requirements 8.6**

### Sharing Properties

**Property 37: Kakao share data completeness**
*For any* Kakao share action, the shared data should include product name, price, image, and current page link.
**Validates: Requirements 9.3**

### Responsive Design Properties

**Property 38: Order page mobile layout**
*For any* viewport width < 1024px on the order page, shipping info and payment summary should be stacked vertically.
**Validates: Requirements 12.3**

**Property 39: Order page desktop layout**
*For any* viewport width >= 1024px on the order page, shipping info and payment summary should be displayed side by side.
**Validates: Requirements 12.4**

