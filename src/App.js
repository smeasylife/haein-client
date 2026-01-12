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
import OrderPage from './pages/OrderPage'; // OrderPage import 추가
import { CartProvider } from './context/CartContext';
import './styles/App.css';

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  // 홈페이지 메인 콘텐츠를 렌더링하는 컴포넌트
  const Home = () => {
    const categorySections = [
      { title: '신상품', category: 'NEW' },
      { title: '인기상품', category: 'BEST' },
      { title: '세일상품', category: 'SALE' },
      { title: '봄/가을', category: '봄/가을' },
      { title: '여름', category: '여름' },
      { title: '겨울', category: '겨울' },
    ];

    return (
      <main className="min-h-screen bg-white pt-20 pb-10">
        <Navbar onBurgerClick={() => setMenuOpen(true)} />
        <HamburgerMenu
          isOpen={menuOpen}
          onClose={() => setMenuOpen(false)}
        />

        <Banner />

        {categorySections.map((section) => {
          const filteredProducts = products.filter(
            (product) => product.category === section.category
          );

          if (filteredProducts.length === 0) return null;

          return (
            <section key={section.category} className="max-w-screen-lg mx-auto px-3 py-10">
              <h2 className="text-2xl font-bold mb-6">{section.title}</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    index={product.id}
                    image={product.image}
                    name={product.name}
                    originalPrice={product.originalPrice}
                    price={product.price}
                    colors={product.colors}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </main>
    );
  };

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
          <Route path="/order" element={<OrderPage />} /> {/* /order 경로 추가 */}
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}