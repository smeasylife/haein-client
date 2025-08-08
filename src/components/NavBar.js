import React from 'react';
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
} from '@heroicons/react/24/outline';

const categories = ['NEW', 'BEST', 'SALE', '봄/가을', '여름', '겨울'];

export default function Navbar({ onBurgerClick }) {
  return (
    <header className="fixed top-0 left-0 w-full z-50">
      {/* Top Bar */}
      <div className="bg-white text-black">
        <div className="flex justify-between items-center w-full px-4 py-0">
          {/* Hamburger */}
          <button className="p-2 focus:outline-none" onClick={onBurgerClick}>
            <Bars3Icon className="h-6 w-6" />
          </button>
          {/* Logo */}
          <span className="text-base font-bold">HABLE</span>
          {/* Icons */}
          <div className="flex space-x-4">
            <button className="p-2 focus:outline-none">
              <MagnifyingGlassIcon className="h-6 w-6" />
            </button>
            <button className="p-2 focus:outline-none">
              <ShoppingBagIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Category Bar */}
      <div className="bg-white backdrop-blur-sm">
        <nav className="flex justify-center space-x-6 w-full px-4 py-1 overflow-x-auto">
          {categories.map((item) => (
            <button
              key={item}
              className="relative pb-1 text-xs stext-black whitespace-nowrap focus:outline-none"
            >
              {item}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
