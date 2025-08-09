import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // 장바구니에 상품 추가 (고유 ID 부여)
  const addToCart = (product) => {
    setCart((prevCart) => [
      ...prevCart,
      { ...product, cartItemId: Date.now(), isSelected: false },
    ]);
  };

  // 상품 선택 상태 토글
  const toggleSelect = (cartItemId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.cartItemId === cartItemId
          ? { ...item, isSelected: !item.isSelected }
          : item
      )
    );
  };

  // 선택된 상품 구매
  const purchaseSelected = () => {
    const selectedItems = cart.filter(item => item.isSelected);
    if (selectedItems.length === 0) {
      alert('구매할 상품을 선택해주세요.');
      return;
    }
    // 구매 로직 (여기서는 alert로 대체)
    alert(`${selectedItems.length}개의 상품을 구매했습니다.`);
    // 구매된 상품들만 장바구니에서 제거
    setCart((prevCart) => prevCart.filter((item) => !item.isSelected));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, toggleSelect, purchaseSelected, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};