import React from 'react';

export default function QnATab({ qnaList }) {
  return (
    <ul className="space-y-4">
      {qnaList.map((qa, i) => (
        <li key={i} className="border-b pb-2">
          <p className="font-medium">{qa.question}</p>
          <p className="text-gray-600 mt-1">{qa.answer}</p>
        </li>
      ))}
    </ul>
  );
}