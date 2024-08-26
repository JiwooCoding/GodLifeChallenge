import { useState } from 'react';
import ProductCategory from './productCategory/ProductCategory';
import GiftPoint from '../../components/giftPoint/GiftPoint';
import ProductList from './productList/ProductList';
import usePagination from '../../hooks/usePagination';

const ProductPage = () => {
    const [selectedCategory, setSelectedCategory] = useState('전체');
    const [activeButtonIndex, setActiveButtonIndex] = useState<number>(0); 
    const [productsPerPage] = useState<number>(20); // 한 페이지당 보여줄 상품 수

    const {currentPage, setCurrentPage, handlePageClick} = usePagination();

    // 카테고리 선택 핸들러
    const handleCategoryChange = (category: string, index: number) => {
        setSelectedCategory(category);
        setActiveButtonIndex(index);
        setCurrentPage(0);
    };

    return (
        <div className="inner">
            <div className="mt-10 text-center">
                <h2 className="text-[30px] font-bold mb-4">포인트 쇼핑</h2>
            </div>
            <ProductCategory 
                onCategoryChange={handleCategoryChange} 
                activeButtonIndex={activeButtonIndex} 
            />
            {selectedCategory === '포인트 전환' ? (
                <GiftPoint/>
            ) : (
                <ProductList 
                    selectedCategory={selectedCategory}
                    currentPage={currentPage}
                    productsPerPage={productsPerPage}
                    handlePageClick={handlePageClick}
                />
            )}
        </div>
    );
};

export default ProductPage;
