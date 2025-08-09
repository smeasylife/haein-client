import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import qna from '../qna'; // 방금 만든 qna 데이터 import

const QnATab = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-screen-lg mx-auto p-4">
      <div className="flex justify-end mb-4">
        <Link to="/qna/write" className="bg-gray-800 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-gray-700">
          문의하기
        </Link>
      </div>

      <div className="border-t border-gray-200">
        {qna.map((item, index) => (
          <div key={item.id} className="border-b border-gray-200">
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full flex justify-between items-center p-4 focus:outline-none"
            >
              <div className="text-left">
                <h3 className="font-semibold text-sm text-gray-800">{item.title}</h3>
                <p className="text-xs text-gray-500 mt-1">
                  {item.author} | {item.date}
                </p>
              </div>
              <span className={`transform transition-transform duration-300 ${activeIndex === index ? 'rotate-180' : ''}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </span>
            </button>
            {activeIndex === index && (
              <div className="p-4 bg-gray-50">
                <div className="mb-4">
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">{item.question}</p>
                </div>
                {item.answer ? (
                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-sm text-gray-800 font-semibold">[답변]</p>
                    <p className="text-sm text-gray-700 mt-2 whitespace-pre-wrap">{item.answer}</p>
                  </div>
                ) : (
                  <div className="border-t border-gray-200 pt-4">
                     <p className="text-sm text-gray-500">아직 답변이 등록되지 않았습니다.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QnATab;
