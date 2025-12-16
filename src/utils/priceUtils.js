/**
 * 가격 계산 유틸리티 함수
 * Requirements: 1.3, 3.4, 11.1, 11.2
 */

/**
 * 할인율 계산
 * Property 2: Discount rate calculation accuracy
 * @param {number} originalPrice - 정가
 * @param {number} salePrice - 판매가
 * @returns {number} 할인율 (정수 퍼센트)
 */
export function calculateDiscountRate(originalPrice, salePrice) {
  if (originalPrice <= 0 || salePrice < 0) {
    return 0;
  }
  if (salePrice >= originalPrice) {
    return 0;
  }
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
}

/**
 * 쿠폰 할인 금액 계산
 * Property 10: Percentage coupon calculation
 * Property 11: Fixed coupon calculation
 * @param {number} basePrice - 기준 가격
 * @param {Object} coupon - 쿠폰 객체 { id, name, discount }
 * @returns {number} 할인 금액
 */
export function calculateCouponDiscount(basePrice, coupon) {
  if (!coupon || basePrice <= 0) {
    return 0;
  }

  const { discount } = coupon;

  // 비율 할인 (0 < discount < 1)
  if (discount > 0 && discount < 1) {
    return Math.floor(basePrice * discount);
  }

  // 고정 금액 할인 (discount >= 1)
  if (discount >= 1) {
    return Math.min(discount, basePrice);
  }

  return 0;
}

/**
 * 사용 가능한 최대 적립금 계산
 * Property 12: Points usage limit
 * @param {number} userPoints - 사용자 보유 적립금
 * @param {number} basePrice - 기준 가격
 * @returns {number} 사용 가능한 최대 적립금
 */
export function calculateMaxUsablePoints(userPoints, basePrice) {
  if (userPoints <= 0 || basePrice <= 0) {
    return 0;
  }

  const maxPointsByPrice = Math.floor(basePrice * 0.05);
  return Math.min(userPoints, maxPointsByPrice);
}

/**
 * 적립금 사용 금액 검증 및 계산
 * @param {number} pointsToUse - 사용하려는 적립금
 * @param {number} userPoints - 사용자 보유 적립금
 * @param {number} basePrice - 기준 가격
 * @returns {number} 실제 사용 가능한 적립금
 */
export function validateAndCalculatePoints(pointsToUse, userPoints, basePrice) {
  const maxUsable = calculateMaxUsablePoints(userPoints, basePrice);
  return Math.min(Math.max(0, pointsToUse), maxUsable);
}

/**
 * 배송비 계산
 * Property 21: Shipping cost calculation
 * @param {number} basePrice - 기준 가격
 * @returns {number} 배송비
 */
export function calculateShippingCost(basePrice) {
  return basePrice >= 50000 ? 0 : 3000;
}

/**
 * 최종 결제 금액 계산
 * Property 22: Discount order of operations
 * @param {number} basePrice - 기준 가격
 * @param {Object} coupon - 쿠폰 객체 (선택적)
 * @param {number} pointsToUse - 사용할 적립금
 * @returns {Object} { finalPrice, couponDiscount, pointsDiscount, shippingCost }
 */
export function calculateFinalPrice(basePrice, coupon = null, pointsToUse = 0) {
  if (basePrice <= 0) {
    return {
      finalPrice: 0,
      couponDiscount: 0,
      pointsDiscount: 0,
      shippingCost: 0,
    };
  }

  // 1. 쿠폰 할인 적용
  const couponDiscount = calculateCouponDiscount(basePrice, coupon);
  const priceAfterCoupon = basePrice - couponDiscount;

  // 2. 적립금 할인 적용
  const pointsDiscount = Math.min(pointsToUse, priceAfterCoupon);
  const priceAfterPoints = priceAfterCoupon - pointsDiscount;

  // 3. 배송비 계산 (원래 basePrice 기준)
  const shippingCost = calculateShippingCost(basePrice);

  // 4. 최종 가격
  const finalPrice = priceAfterPoints + shippingCost;

  return {
    finalPrice: Math.max(0, finalPrice),
    couponDiscount,
    pointsDiscount,
    shippingCost,
  };
}
