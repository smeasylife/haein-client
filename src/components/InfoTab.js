import React from 'react';

export default function InfoTab({ shipping, contact }) {
  return (
    <div className="space-y-2 text-gray-700">
      <h3 className="font-semibold">배송 정보</h3>
      <p>{shipping}</p>
      <h3 className="font-semibold mt-4">문의 연락처</h3>
      <p>{contact}</p>
    </div>
  );
}