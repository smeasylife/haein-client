import React from "react";
import ProductCard from "./components/ProductCard";
import products from "./products.js";
import "./styles/App.css"; 

function App() {
  return (
    <main className="min-h-screen bg-white px-6 py-10">
      <header className="mb-8 text-center">
        <h1 className="text-2xl font-bold tracking-wide">MIMIN</h1>
        <p className="text-gray-400 mt-2">WEEKLY BEST</p>
      </header>
      <section className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
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
