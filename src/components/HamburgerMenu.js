import React from 'react';
import PropTypes from 'prop-types';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function HamburgerMenu({ isOpen, onClose, menuItems }) {
    const navigate = useNavigate();
  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          key="hamburger"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[999]"
        >
          {/* 오버레이 */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          {/* 사이드 메뉴 */}
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="relative h-full w-64 bg-white shadow-lg p-6 flex flex-col"
          >
            <button
              onClick={onClose}
              className="self-end mb-4 text-2xl font-bold"
            >
              ×
            </button>
                      
            <button
                onClick={() => {
                    onClose();
                    navigate('/login');
                }}
              className="w-full bg-black text-white font-medium py-2 rounded mb-4"
            >
              로그인
            </button>
                      
            <nav className="flex-1 flex flex-col space-y-4">
              {menuItems.map((item, idx) => (
                <button
                  key={idx}
                  onClick={onClose}
                  className="text-left text-lg font-medium hover:text-gray-700"
                >
                  {item}
                </button>
              ))}
            </nav>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

HamburgerMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  menuItems: PropTypes.arrayOf(PropTypes.string)
};

HamburgerMenu.defaultProps = {
  menuItems: []
};
