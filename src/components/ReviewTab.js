import React from 'react';

export default function ReviewTab({ reviews }) {
  return (
    <ul className="space-y-6">
      {reviews.map((rv, i) => (
        <li key={i} className="border-b pb-4">
          <p className="font-medium">{rv.user} · <span className="text-sm text-gray-500">{rv.date}</span></p>
          <p className="mt-2">{rv.text}</p>
        </li>
      ))}
    </ul>
  );
}