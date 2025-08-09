
import React from 'react';
import { XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const popularSearches = ['크로스백', '넥크리스', '브레이슬릿', '봄 자켓', '세일'];

const SearchComponent = ({ onClose }) => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md animate-fade-in-down">
      <div className="flex items-center w-full px-4 py-2">
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          className="w-full bg-transparent focus:outline-none text-lg border-b border-black pb-1"
          autoFocus
        />
        <button className="p-2">
          <MagnifyingGlassIcon className="h-6 w-6" />
        </button>
        <button onClick={onClose} className="p-2">
          <XMarkIcon className="h-6 w-6" />
        </button>
      </div>
      <div className="px-6 pb-4">
        <h3 className="text-sm font-semibold text-gray-600">인기 검색어</h3>
        <ul className="mt-2 flex flex-wrap gap-2">
          {popularSearches.map(term => (
            <li key={term}>
              <button className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm hover:bg-gray-200">
                {term}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default SearchComponent;
