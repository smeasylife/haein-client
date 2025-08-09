
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import image1 from '../assets/image1.jpg';
import image2 from '../assets/image2.jpg';
import image3 from '../assets/image3.jpg';
import image4 from '../assets/image4.jpg';
import image5 from '../assets/image5.jpg';

const images = [image1, image2, image3, image4, image5];

const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    };
  }
};

const Banner = () => {
  const [[page, direction], setPage] = useState([0, 0]);

  const paginate = (newDirection) => {
    setPage([(page + newDirection + images.length) % images.length, newDirection]);
  };

  useEffect(() => {
    const timer = setTimeout(() => paginate(1), 3000);
    return () => clearTimeout(timer);
  }, [page]);

  return (
    <div className="relative w-full h-96 overflow-hidden">
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          key={page}
          src={images[page]}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          className="absolute w-full h-full object-cover"
        />
      </AnimatePresence>
      <div className="absolute bottom-4 w-full flex justify-center space-x-2 z-10">
        {images.map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full cursor-pointer ${page === i ? 'bg-white' : 'bg-gray-400'}`}
            onClick={() => setPage([i, i > page ? 1 : -1])}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
