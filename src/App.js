import React from "react";
import ProductCard from "./components/ProductCard";
import Navbar from "./components/NavBar.js";
import products from "./products.js";
import "./styles/App.css"; 

function App() {
  return (
    <main className="min-h-screen bg-white px-6 py-10">
      <Navbar/>
      <section className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
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
