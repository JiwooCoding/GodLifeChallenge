import { useEffect, useState } from 'react';
import ProductItem from '../productItem/ProductItem';
import { IProduct } from '../../../type/IProduct';
import api from '../../../api/api';
import Pagination from '../../../components/pagination/Pagination';
import AutoComplete from '../../../components/auto-complete/AutoComplete';


interface ProductListProps {
    selectedCategory: string; // active된 카테고리
    currentPage: number; // 현재 페이지 번호
    productsPerPage: number; // 페이지당 보이는 상품 갯수
    handlePageClick: (data: { selected: number }) => void; // 페이지 변경 핸들러
    //handlePurchaseClick: (productPoints: number) => void; // 구매하기 버튼
}

const ProductList = ({ selectedCategory, currentPage, productsPerPage, handlePageClick }: ProductListProps) => {
    const [products, setProducts] = useState<IProduct[]>([]); // 모든 상품
    const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]); // 필터된 상품

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.get('/shop');
                setProducts(response.data);
                setFilteredProducts(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchProducts();
    }, []);


    // 선택한 카테고리에 따른 필터링
    const filteredCategoryProducts = selectedCategory === '전체'
        ? filteredProducts
        : filteredProducts.filter(product => product.category === selectedCategory);

    // 현재 페이지에 해당하는 상품 계산
    const offset = currentPage * productsPerPage;
    const currentProducts = filteredCategoryProducts.slice(offset, offset + productsPerPage);
    const pageCount = Math.ceil(filteredCategoryProducts.length / productsPerPage);

    return (
        <>
            <AutoComplete
                items={products}
                setFilteredItems={setFilteredProducts}
                displayProperty="productName"
            />
            <ul className='product-list'>
                {currentProducts.map(product => (
                    <ProductItem
                        key={product.id}
                        product={product}
                    />
                ))}
            </ul>

            {filteredCategoryProducts.length > productsPerPage && (
                <Pagination
                    pageCount={pageCount}
                    handlePageClick={handlePageClick}
                />
            )}
        </>
    );
}

export default ProductList;
