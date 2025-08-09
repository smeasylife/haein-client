
import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import Navbar from '../components/NavBar';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { CheckCircleIcon as CheckCircleOutlineIcon } from '@heroicons/react/24/outline';

const CartPage = () => {
  const { cart, toggleSelect, purchaseSelected } = useContext(CartContext);

  const selectedItems = cart.filter(item => item.isSelected);
  const totalPrice = selectedItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="bg-white text-black min-h-screen">
      <Navbar />
      <main className="max-w-4xl mx-auto pt-24 pb-32 px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Shopping Cart</h1>
        
        <div className="space-y-6">
          {cart.length === 0 ? (
            <p className="text-center text-gray-500">Your cart is empty.</p>
          ) : (
            cart.map((product) => (
              <div key={product.cartItemId} className="flex items-start border-b border-gray-200 pb-6">
                <button onClick={() => toggleSelect(product.cartItemId)} className="p-2 mt-8">
                  {product.isSelected ? (
                    <CheckCircleIcon className="w-6 h-6 text-black" />
                  ) : (
                    <CheckCircleOutlineIcon className="w-6 h-6 text-gray-400" />
                  )}
                </button>
                <img src={product.image} alt={product.name} className="w-24 h-24 object-cover rounded-md ml-4" />
                <div className="flex-grow ml-4 flex flex-col">
                  <h2 className="text-base font-semibold">{product.name}</h2>
                  <p className="text-sm text-gray-600 mt-1">Size: Free / 수량: 1</p>
                  <p className="text-sm text-gray-500 line-through mt-2">{product.originalPrice.toLocaleString()}원</p>
                  <p className="text-base font-bold">{product.price.toLocaleString()}원</p>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      {selectedItems.length > 0 && (
        <footer className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-lg">
          <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
            <div>
              <p className="text-lg">총 {selectedItems.length}개 선택</p>
              <p className="text-2xl font-bold">{totalPrice.toLocaleString()}원</p>
            </div>
            <button 
              onClick={purchaseSelected} 
              className="bg-black text-white px-10 py-4 rounded-lg font-bold text-lg hover:bg-gray-800 transition-colors"
            >
              구매하기
            </button>
          </div>
        </footer>
      )}
    </div>
  );
};

export default CartPage;
