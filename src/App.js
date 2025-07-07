import React, { useState } from "react";
import ProductCard from "./components/ProductCard";
import HamburgerMenu from './components/HamburgerMenu';
import Navbar from "./components/NavBar.js";
import products from "./products.js";
import "./styles/App.css"; 

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuItems = ['NEW', 'BEST', 'SALE', '봄/가을', '여름', '겨울'];
  return (
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
}

export default App;
