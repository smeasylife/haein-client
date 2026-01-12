import React, { useState } from 'react';
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import SearchComponent from './SearchComponent';

export default function Navbar({ onBurgerClick }) {
  const [showSearch, setShowSearch] = useState(false);

  const handleSearchClick = () => {
    setShowSearch(true);
  };

  const handleCloseSearch = () => {
    setShowSearch(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      {showSearch && <SearchComponent onClose={handleCloseSearch} />}
      {!showSearch && (
        <>
          {/* Top Bar */}
          <div className="bg-white text-black">
            <div className="flex justify-between items-center w-full px-4 py-0">
              {/* Hamburger */}
              <button className="p-2 focus:outline-none" onClick={onBurgerClick}>
                <Bars3Icon className="h-6 w-6" />
              </button>
              {/* Logo */}
              <Link to="/" className="text-base font-bold">HABLE</Link>
              {/* Icons */}
              <div className="flex space-x-4">
                <button className="p-2 focus:outline-none" onClick={handleSearchClick}>
                  <MagnifyingGlassIcon className="h-6 w-6" />
                </button>
                <Link to="/cart" className="p-2 focus:outline-none">
                  <ShoppingBagIcon className="h-6 w-6" />
                </Link>
              </div>
            </div>
          </div>


        </>
      )}
    </header>
  );
}
