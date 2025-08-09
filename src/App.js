import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductCard from './components/ProductCard';
import Banner from './components/Banner';
import HamburgerMenu from './components/HamburgerMenu';
import Navbar from './components/NavBar';
import SearchComponent from './components/SearchComponent'; // 추가
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUp';
import products from './products';
import ProductDetail from './pages/ProductDetail';
import QnAWritePage from './pages/QnAWritePage';
import CartPage from './pages/CartPage';
import { CartProvider } from './context/CartContext';
import './styles/App.css';

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuItems = ['NEW', 'BEST', 'SALE', '봄/가을', '여름', '겨울'];

  // 홈페이지 메인 콘텐츠를 렌더링하는 컴포넌트
  const Home = () => (
    <main className="min-h-screen bg-white pt-20 pb-10">
      <Banner />
      <section className="max-w-screen-lg mx-auto px-3 pt-3 pb-10">
      <Navbar onBurgerClick={() => setMenuOpen(true)} />
      <HamburgerMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        menuItems={menuItems}
      />

      {/* 기본 2열, md부터 3열 */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 items-start">
        {products.map((product, idx) => (
        <ProductCard
          key={idx}
          index={idx}
         image={product.image}
         name={product.name}
         originalPrice={product.originalPrice}
          price={product.price}
          colors={product.colors}
       />
      ))}
      </div>
      </section>
    </main>
  );

  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/qna/write" element={<QnAWritePage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}
