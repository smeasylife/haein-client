/**
 * Property-based tests for price utility functions
 * Validates Properties 2, 10, 11, 12, 19, 20, 21, 22 from design.md
 */

import {
  calculateDiscountRate,
  calculateCouponDiscount,
  calculateMaxUsablePoints,
  validateAndCalculatePoints,
  calculateShippingCost,
  calculateFinalPrice
} from './priceUtils';

describe('Property-based Tests for Price Utilities', () => {

  // Property 2: Discount rate calculation accuracy
  describe('Property 2: Discount rate calculation accuracy', () => {
    test('should equal Math.round(((originalPrice - salePrice) / originalPrice) * 100)', () => {
      const testCases = [
        { originalPrice: 32000, salePrice: 29000, expected: 9 },
        { originalPrice: 50000, salePrice: 35000, expected: 30 },
        { originalPrice: 10000, salePrice: 7000, expected: 30 },
        { originalPrice: 15000, salePrice: 12000, expected: 20 },
        { originalPrice: 100000, salePrice: 80000, expected: 20 }
      ];

      testCases.forEach(({ originalPrice, salePrice, expected }) => {
        const result = calculateDiscountRate(originalPrice, salePrice);
        const formulaResult = Math.round(((originalPrice - salePrice) / originalPrice) * 100);

        expect(result).toBe(formulaResult);
        expect(result).toBe(expected);
      });
    });

    test('should handle edge cases correctly', () => {
      expect(calculateDiscountRate(32000, 32000)).toBe(0); // no discount
      expect(calculateDiscountRate(32000, 33000)).toBe(0); // sale price higher than original
      expect(calculateDiscountRate(0, 1000)).toBe(0); // zero original price
      expect(calculateDiscountRate(-1000, 1000)).toBe(0); // negative original price
      expect(calculateDiscountRate(1000, -1000)).toBe(0); // negative sale price
    });
  });

  // Property 10: Percentage coupon calculation
  describe('Property 10: Percentage coupon calculation', () => {
    test('should equal basePrice * discount for percentage coupons (0 < discount < 1)', () => {
      const testCases = [
        { basePrice: 10000, coupon: { id: '1', name: '10% 할인', discount: 0.1 }, expected: 1000 },
        { basePrice: 50000, coupon: { id: '2', name: '20% 할인', discount: 0.2 }, expected: 10000 },
        { basePrice: 25000, coupon: { id: '3', name: '15% 할인', discount: 0.15 }, expected: 3750 },
        { basePrice: 33333, coupon: { id: '4', name: '5% 할인', discount: 0.05 }, expected: 1666 }
      ];

      testCases.forEach(({ basePrice, coupon, expected }) => {
        const result = calculateCouponDiscount(basePrice, coupon);
        const formulaResult = Math.floor(basePrice * coupon.discount);

        expect(result).toBe(formulaResult);
        expect(result).toBe(expected);
      });
    });

    test('should handle edge cases for percentage coupons', () => {
      const coupon = { id: '1', name: '10% 할인', discount: 0.1 };

      expect(calculateCouponDiscount(0, coupon)).toBe(0);
      expect(calculateCouponDiscount(-1000, coupon)).toBe(0);
      expect(calculateCouponDiscount(10000, null)).toBe(0);
      expect(calculateCouponDiscount(10000, undefined)).toBe(0);
    });
  });

  // Property 11: Fixed coupon calculation
  describe('Property 11: Fixed coupon calculation', () => {
    test('should equal the discount value for fixed amount coupons (discount >= 1)', () => {
      const testCases = [
        { basePrice: 10000, coupon: { id: '1', name: '1000원 할인', discount: 1000 }, expected: 1000 },
        { basePrice: 50000, coupon: { id: '2', name: '5000원 할인', discount: 5000 }, expected: 5000 },
        { basePrice: 3000, coupon: { id: '3', name: '10000원 할인', discount: 10000 }, expected: 3000 }, // discount > basePrice
        { basePrice: 20000, coupon: { id: '4', name: '2500원 할인', discount: 2500 }, expected: 2500 }
      ];

      testCases.forEach(({ basePrice, coupon, expected }) => {
        const result = calculateCouponDiscount(basePrice, coupon);

        if (coupon.discount >= basePrice) {
          expect(result).toBe(basePrice); // Should not exceed base price
        } else {
          expect(result).toBe(coupon.discount);
        }
        expect(result).toBe(expected);
      });
    });

    test('should handle edge cases for fixed coupons', () => {
      const coupon = { id: '1', name: '1000원 할인', discount: 1000 };

      expect(calculateCouponDiscount(0, coupon)).toBe(0);
      expect(calculateCouponDiscount(-1000, coupon)).toBe(0);
      expect(calculateCouponDiscount(10000, null)).toBe(0);
    });
  });

  // Property 12: Points usage limit
  describe('Property 12: Points usage limit', () => {
    test('should limit usage to minimum of (userPoints, Math.floor(basePrice * 0.05))', () => {
      const testCases = [
        { userPoints: 1000, basePrice: 10000, expected: 500 }, // 5% of 10000 = 500
        { userPoints: 2000, basePrice: 50000, expected: 2000 }, // 5% of 50000 = 2500, user has 2000
        { userPoints: 5000, basePrice: 30000, expected: 1500 }, // 5% of 30000 = 1500, user has 5000
        { userPoints: 100, basePrice: 1000, expected: 50 }, // 5% of 1000 = 50, user has 100
        { userPoints: 3000, basePrice: 40000, expected: 2000 } // 5% of 40000 = 2000, user has 3000
      ];

      testCases.forEach(({ userPoints, basePrice, expected }) => {
        const result = calculateMaxUsablePoints(userPoints, basePrice);
        const maxPointsByPrice = Math.floor(basePrice * 0.05);
        const formulaResult = Math.min(userPoints, maxPointsByPrice);

        expect(result).toBe(formulaResult);
        expect(result).toBe(expected);
      });
    });

    test('should handle edge cases for points calculation', () => {
      expect(calculateMaxUsablePoints(0, 10000)).toBe(0);
      expect(calculateMaxUsablePoints(-1000, 10000)).toBe(0);
      expect(calculateMaxUsablePoints(1000, 0)).toBe(0);
      expect(calculateMaxUsablePoints(1000, -5000)).toBe(0);
    });
  });

  // Property 19: Coupon discount application (order page context)
  describe('Property 19: Coupon discount application', () => {
    test('should be calculated and subtracted from the base price on order page', () => {
      const basePrice = 50000;
      const coupon = { id: '1', name: '10% 할인', discount: 0.1 };

      const { finalPrice, couponDiscount } = calculateFinalPrice(basePrice, coupon, 0);

      expect(couponDiscount).toBe(5000); // 10% of 50000
      expect(finalPrice).toBe(basePrice - couponDiscount + 0); // No shipping since >= 50000
    });
  });

  // Property 20: Points discount application
  describe('Property 20: Points discount application', () => {
    test('should be subtracted from the price after coupon discount', () => {
      const basePrice = 50000;
      const coupon = { id: '1', name: '10% 할인', discount: 0.1 };
      const pointsToUse = 2000;

      const { finalPrice, couponDiscount, pointsDiscount } = calculateFinalPrice(basePrice, coupon, pointsToUse);

      expect(couponDiscount).toBe(5000); // 10% of 50000
      expect(pointsDiscount).toBe(2000); // All points used (within 5% limit)
      expect(finalPrice).toBe(basePrice - couponDiscount - pointsDiscount); // 50000 - 5000 - 2000 = 43000
    });
  });

  // Property 21: Shipping cost calculation
  describe('Property 21: Shipping cost calculation', () => {
    test('should be 3000 won when basePrice < 50000 and 0 won when basePrice >= 50000', () => {
      const testCases = [
        { basePrice: 30000, expectedShipping: 3000 },
        { basePrice: 49999, expectedShipping: 3000 },
        { basePrice: 50000, expectedShipping: 0 },
        { basePrice: 75000, expectedShipping: 0 },
        { basePrice: 100000, expectedShipping: 0 }
      ];

      testCases.forEach(({ basePrice, expectedShipping }) => {
        const { shippingCost } = calculateFinalPrice(basePrice, null, 0);
        expect(shippingCost).toBe(expectedShipping);

        // Test the function directly
        expect(calculateShippingCost(basePrice)).toBe(expectedShipping);
      });
    });
  });

  // Property 22: Discount order of operations
  describe('Property 22: Discount order of operations', () => {
    test('final price should equal basePrice - couponDiscount - pointsDiscount + shippingCost', () => {
      const testCases = [
        {
          basePrice: 30000,
          coupon: { id: '1', name: '10% 할인', discount: 0.1 },
          pointsToUse: 1000,
          expectedFormula: (base, disc, points, ship) => base - disc - points + ship
        },
        {
          basePrice: 60000,
          coupon: { id: '2', name: '5000원 할인', discount: 5000 },
          pointsToUse: 2000,
          expectedFormula: (base, disc, points, ship) => base - disc - points + ship
        },
        {
          basePrice: 45000,
          coupon: null,
          pointsToUse: 1500,
          expectedFormula: (base, disc, points, ship) => base - disc - points + ship
        }
      ];

      testCases.forEach(({ basePrice, coupon, pointsToUse, expectedFormula }) => {
        const { finalPrice, couponDiscount, pointsDiscount, shippingCost } =
          calculateFinalPrice(basePrice, coupon, pointsToUse);

        const expectedFinalPrice = expectedFormula(basePrice, couponDiscount, pointsDiscount, shippingCost);

        expect(finalPrice).toBe(expectedFinalPrice);
      });
    });
  });

  // Additional comprehensive tests for function integration
  describe('Integration Tests', () => {
    test('should handle complex order calculation with all discount types', () => {
      const basePrice = 75000;
      const coupon = { id: '1', name: '20% 할인', discount: 0.2 };
      const pointsToUse = 3000;

      const result = calculateFinalPrice(basePrice, coupon, pointsToUse);

      // Expected calculations:
      // Coupon discount: 20% of 75000 = 15000
      // Price after coupon: 75000 - 15000 = 60000
      // Points discount: min(3000, 5% of 75000 = 3750) = 3000
      // Price after points: 60000 - 3000 = 57000
      // Shipping: 0 (basePrice >= 50000)
      // Final: 57000

      expect(result.couponDiscount).toBe(15000);
      expect(result.pointsDiscount).toBe(3000);
      expect(result.shippingCost).toBe(0);
      expect(result.finalPrice).toBe(57000);
    });

    test('should handle order with shipping cost', () => {
      const basePrice = 35000;
      const coupon = { id: '1', name: '10% 할인', discount: 0.1 };
      const pointsToUse = 1000;

      const result = calculateFinalPrice(basePrice, coupon, pointsToUse);

      // Expected calculations:
      // Coupon discount: 10% of 35000 = 3500
      // Price after coupon: 35000 - 3500 = 31500
      // Points discount: min(1000, 5% of 35000 = 1750) = 1000
      // Price after points: 31500 - 1000 = 30500
      // Shipping: 3000 (basePrice < 50000)
      // Final: 33500

      expect(result.couponDiscount).toBe(3500);
      expect(result.pointsDiscount).toBe(1000);
      expect(result.shippingCost).toBe(3000);
      expect(result.finalPrice).toBe(33500);
    });
  });
});