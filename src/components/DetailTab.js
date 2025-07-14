import React from 'react';

export default function DetailTab({ images }) {
  return (
    <div className="grid grid-cols-1 gap-4">
      {images.map((src, i) => (
        <img key={i} src={src} alt={`detail-${i}`} className="w-full object-cover rounded" />
      ))}
    </div>
  );
}