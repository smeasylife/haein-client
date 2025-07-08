import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductCard from './components/ProductCard';
import HamburgerMenu from './components/HamburgerMenu';
import Navbar from './components/NavBar';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUp';
import products from './products';
import './styles/App.css';

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuItems = ['NEW', 'BEST', 'SALE', '봄/가을', '여름', '겨울'];

  // 홈페이지 메인 콘텐츠를 렌더링하는 컴포넌트
  const Home = () => (
    <main className="min-h-screen bg-white px-6 pt-20 pb-10">
      <Navbar onBurgerClick={() => setMenuOpen(true)} />
      <HamburgerMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        menuItems={menuItems}
      />
      <section className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product, idx) => (
            <ProductCard
              key={idx}
              image={product.image}
              name={product.name}
              price={product.price}
              colors={product.colors}
            />
          ))}
        </div>
      </section>
    </main>
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage/>} />
      </Routes>
    </BrowserRouter>
  );
}
