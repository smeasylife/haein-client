import React from 'react';
import PropTypes from 'prop-types';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function HamburgerMenu({ isOpen, onClose }) {
    const navigate = useNavigate();
    const [expandedCategories, setExpandedCategories] = React.useState(new Set());

    // 더미 카테고리 데이터
    const categories = React.useMemo(() => [
        {
            id: 1,
            name: 'NEW',
            parentId: null,
            subCategories: [
                { id: 11, name: '신상품 가방', parentId: 1, subCategories: [] },
                { id: 12, name: '신상품 주얼리', parentId: 1, subCategories: [] },
                { id: 13, name: '신상품 악세서리', parentId: 1, subCategories: [] }
            ]
        },
        {
            id: 2,
            name: 'BEST',
            parentId: null,
            subCategories: [
                { id: 21, name: '베스트 셀러', parentId: 2, subCategories: [] },
                { id: 22, name: '인기 상품', parentId: 2, subCategories: [] }
            ]
        },
        {
            id: 3,
            name: 'SALE',
            parentId: null,
            subCategories: [
                { id: 31, name: '50% OFF', parentId: 3, subCategories: [] },
                { id: 32, name: '30% OFF', parentId: 3, subCategories: [] },
                { id: 33, name: '20% OFF', parentId: 3, subCategories: [] }
            ]
        },
        {
            id: 4,
            name: '봄/가을',
            parentId: null,
            subCategories: [
                { id: 41, name: '가디건', parentId: 4, subCategories: [] },
                { id: 42, name: '자켓', parentId: 4, subCategories: [] },
                { id: 43, name: '니트', parentId: 4, subCategories: [] }
            ]
        },
        {
            id: 5,
            name: '여름',
            parentId: null,
            subCategories: [
                { id: 51, name: '원피스', parentId: 5, subCategories: [] },
                { id: 52, name: '블라우스', parentId: 5, subCategories: [] },
                { id: 53, name: '반팔 티셔츠', parentId: 5, subCategories: [] },
                { id: 54, name: '린넨 소재', parentId: 5, subCategories: [] }
            ]
        },
        {
            id: 6,
            name: '겨울',
            parentId: null,
            subCategories: [
                { id: 61, name: '코트', parentId: 6, subCategories: [] },
                { id: 62, name: '패딩', parentId: 6, subCategories: [] },
                { id: 63, name: '목도리', parentId: 6, subCategories: [] },
                { id: 64, name: '장갑', parentId: 6, subCategories: [] }
            ]
        }
    ], []);

    const toggleCategory = (categoryId) => {
        setExpandedCategories(prev => {
            const newSet = new Set(prev);
            if (newSet.has(categoryId)) {
                newSet.delete(categoryId);
            } else {
                newSet.add(categoryId);
            }
            return newSet;
        });
    };

    const renderCategory = (category, level = 0) => {
        const hasSubCategories = category.subCategories && category.subCategories.length > 0;
        const isExpanded = expandedCategories.has(category.id);

        return (
            <div key={category.id}>
                <button
                    onClick={() => {
                        if (hasSubCategories) {
                            toggleCategory(category.id);
                        } else {
                            // 하위 카테고리가 없을 때만 메뉴 닫기
                            onClose();
                        }
                    }}
                    className={`w-full text-left flex items-center justify-between py-2 hover:text-gray-700 ${level > 0 ? 'pl-4 text-base' : 'text-lg font-medium'}`}
                    style={{ paddingLeft: `${level * 16 + 0}px` }}
                >
                    <span>{category.name}</span>
                    {hasSubCategories && (
                        <span className="text-xl">
                            {isExpanded ? '−' : '+'}
                        </span>
                    )}
                </button>
                {hasSubCategories && isExpanded && (
                    <div className="mt-1">
                        {category.subCategories.map(subCategory => renderCategory(subCategory, level + 1))}
                    </div>
                )}
            </div>
        );
    };

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

                        <nav className="flex-1 flex flex-col overflow-y-auto">
                            {categories.map(category => renderCategory(category))}
                        </nav>
                    </motion.aside>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

HamburgerMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};
