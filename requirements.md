# Requirements Document

## Introduction

Hable(헤이블)은 신뢰감과 깔끔함을 제공하는 이불 전문 쇼핑몰입니다. 화이트, 블랙 톤과 미니멀한 디자인을 통해 사용자에게 편안하고 직관적인 쇼핑 경험을 제공합니다. 본 문서는 Hable 쇼핑몰의 핵심 기능들을 정의합니다.

## Glossary

- **System**: Hable 쇼핑몰 웹 애플리케이션
- **User**: 쇼핑몰을 방문하고 상품을 구매하는 고객
- **Admin**: 상품 및 고객 문의를 관리하는 관리자
- **Product**: 판매되는 이불 및 침구 상품
- **Cart**: 사용자가 구매 전 상품을 임시 보관하는 장바구니
- **Order**: 사용자의 상품 구매 요청
- **Review**: 상품에 대한 사용자의 평가 및 후기
- **Q&A**: 상품에 대한 사용자의 질문과 관리자의 답변
- **Coupon**: 상품 가격 할인을 위한 쿠폰
- **Points**: 상품 구매 시 사용 가능한 적립금

## Requirements

### Requirement 1: 상품 목록 조회

**User Story:** As a User, I want to view a list of available products, so that I can browse and select items to purchase.

#### Acceptance Criteria

1. WHEN a User accesses the main page, THE System SHALL display a grid of Product cards
2. WHEN displaying Product cards, THE System SHALL show the Product image, name, original price, sale price, and available colors
3. WHEN a Product has a discount, THE System SHALL calculate and display the discount rate
4. THE System SHALL organize Products in a responsive grid layout with 2 columns on mobile and 3 columns on desktop
5. WHEN a User clicks on a Product card, THE System SHALL navigate to the Product detail page

### Requirement 2: 상품 상세 정보 조회

**User Story:** As a User, I want to view detailed information about a product, so that I can make an informed purchase decision.

#### Acceptance Criteria

1. WHEN a User views a Product detail page, THE System SHALL display multiple Product images with navigation controls
2. WHEN a User navigates through Product images, THE System SHALL transition smoothly between images
3. WHEN displaying Product details, THE System SHALL show description, size options, fabric information, and model information
4. THE System SHALL display the original price, sale price, and discount rate for the Product
5. WHEN a Product has multiple images, THE System SHALL provide previous and next buttons for image navigation

### Requirement 3: 상품 옵션 선택 및 구매

**User Story:** As a User, I want to select product options and proceed to purchase, so that I can buy the items I want.

#### Acceptance Criteria

1. WHEN a User clicks the purchase button, THE System SHALL display a modal with Product options
2. WHEN selecting options, THE System SHALL allow the User to choose color and size
3. WHEN a User adjusts quantity, THE System SHALL update the total price accordingly
4. WHEN a User selects a coupon, THE System SHALL apply the discount to the total price
5. WHEN a User enters points to use, THE System SHALL validate against available points and maximum usable points
6. WHEN a User confirms purchase, THE System SHALL navigate to the order page with selected options

### Requirement 4: 장바구니 관리

**User Story:** As a User, I want to add products to my cart and manage them, so that I can purchase multiple items together.

#### Acceptance Criteria

1. WHEN a User clicks the add to cart button, THE System SHALL add the Product to the Cart with a unique identifier
2. WHEN viewing the Cart page, THE System SHALL display all Cart items with Product image, name, options, and price
3. WHEN a User selects Cart items, THE System SHALL allow toggling selection state for each item
4. WHEN Cart items are selected, THE System SHALL calculate and display the total price of selected items
5. WHEN a User clicks purchase on selected items, THE System SHALL remove purchased items from the Cart

### Requirement 5: 주문 및 결제

**User Story:** As a User, I want to enter shipping information and complete payment, so that I can receive my purchased products.

#### Acceptance Criteria

1. WHEN a User accesses the order page, THE System SHALL display the Product summary with selected options
2. WHEN entering shipping information, THE System SHALL provide address search functionality using Daum Postcode API
3. WHEN a User selects a coupon on the order page, THE System SHALL apply the discount to the order total
4. WHEN a User enters points on the order page, THE System SHALL validate and apply the points discount
5. WHEN calculating final price, THE System SHALL include shipping cost of 3000 won for orders under 50000 won
6. WHEN a User clicks the payment button, THE System SHALL validate all required shipping information is entered

### Requirement 6: 회원 인증 및 가입

**User Story:** As a User, I want to sign up and log in to the platform, so that I can access personalized features.

#### Acceptance Criteria

1. WHEN a User accesses the login page, THE System SHALL provide options for email login and Kakao social login
2. WHEN a User initiates Kakao login, THE System SHALL integrate with Kakao SDK for authentication
3. WHEN a User signs up, THE System SHALL require email verification with a time-limited code
4. WHEN sending verification code, THE System SHALL start a 5-minute countdown timer
5. WHEN a User enters verification code, THE System SHALL validate the code and mark email as verified
6. WHEN a User enters password confirmation, THE System SHALL validate that passwords match
7. WHEN a User submits signup form, THE System SHALL require email verification to be completed

### Requirement 7: 상품 리뷰 조회

**User Story:** As a User, I want to read product reviews, so that I can learn from other customers' experiences.

#### Acceptance Criteria

1. WHEN viewing the review tab on Product detail page, THE System SHALL display all Reviews for the Product
2. WHEN displaying a Review, THE System SHALL show nickname, rating, product option, images, and review text
3. WHEN a Review text exceeds a certain length, THE System SHALL provide a "show more" button to expand the text
4. WHEN a Review has an Admin comment, THE System SHALL display the Admin response below the Review
5. THE System SHALL display the total number of Reviews in the tab label

### Requirement 8: 상품 Q&A 조회 및 작성

**User Story:** As a User, I want to ask questions about products and view answers, so that I can get clarification before purchasing.

#### Acceptance Criteria

1. WHEN viewing the Q&A tab on Product detail page, THE System SHALL display all Q&A entries for the Product
2. WHEN displaying a Q&A entry, THE System SHALL show title, author, date, question, and answer if available
3. WHEN a Q&A entry has no answer, THE System SHALL indicate that it is pending response
4. WHEN a User clicks the write Q&A button, THE System SHALL navigate to the Q&A write page
5. WHEN a User submits a Q&A, THE System SHALL require title and content fields to be filled
6. THE System SHALL display the total number of Q&A entries in the tab label

### Requirement 9: 상품 공유

**User Story:** As a User, I want to share products with others, so that I can recommend items to friends and family.

#### Acceptance Criteria

1. WHEN a User clicks the share button on Product detail page, THE System SHALL display sharing options
2. WHEN a User selects Kakao share, THE System SHALL use Kakao Link API to share Product information
3. WHEN sharing via Kakao, THE System SHALL include Product name, price, image, and link
4. WHEN a User selects copy link, THE System SHALL copy the current page URL to clipboard
5. WHEN link is copied successfully, THE System SHALL display a confirmation message

### Requirement 10: 네비게이션 및 검색

**User Story:** As a User, I want to navigate through categories and search for products, so that I can find items efficiently.

#### Acceptance Criteria

1. WHEN a User accesses any page, THE System SHALL display a fixed navigation bar at the top
2. WHEN displaying the navigation bar, THE System SHALL show hamburger menu, logo, search icon, and cart icon
3. WHEN a User clicks the hamburger menu, THE System SHALL display a side menu with category options
4. WHEN a User clicks the search icon, THE System SHALL display a search interface
5. WHEN a User clicks the cart icon, THE System SHALL navigate to the Cart page
6. THE System SHALL display category tabs including NEW, BEST, SALE, 봄/가을, 여름, 겨울

### Requirement 11: 할인 및 적립금 시스템

**User Story:** As a User, I want to use coupons and points for discounts, so that I can save money on purchases.

#### Acceptance Criteria

1. WHEN a User selects a percentage coupon, THE System SHALL calculate discount as a percentage of the base price
2. WHEN a User selects a fixed amount coupon, THE System SHALL subtract the fixed amount from the base price
3. WHEN a User enters points to use, THE System SHALL limit usage to 5% of the base price
4. WHEN a User enters points to use, THE System SHALL limit usage to available points balance
5. WHEN calculating final price, THE System SHALL apply coupon discount first, then points discount
6. WHEN a User clicks use all points, THE System SHALL automatically fill in the maximum usable points

### Requirement 12: 반응형 디자인

**User Story:** As a User, I want the website to work well on different devices, so that I can shop comfortably on any screen size.

#### Acceptance Criteria

1. WHEN a User accesses the System on mobile devices, THE System SHALL display a 2-column Product grid
2. WHEN a User accesses the System on desktop devices, THE System SHALL display a 3-column Product grid
3. WHEN displaying the order page on mobile, THE System SHALL stack shipping info and payment summary vertically
4. WHEN displaying the order page on desktop, THE System SHALL show shipping info and payment summary side by side
5. THE System SHALL ensure all interactive elements are touch-friendly on mobile devices
