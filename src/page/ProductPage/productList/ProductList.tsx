import { useEffect, useState } from "react";
import { IProduct } from "../../../type/IProduct";
import AutoComplete from "../../../components/auto-complete/AutoComplete";
import ProductItem from "../productItem/ProductItem";
import Pagination from "../../../components/pagination/Pagination";
import api from "../../../api/api";
import PriceSort from "../../../components/priceSort/PriceSort";

interface ProductListProps {
    selectedCategory:string;
    currentPage:number;
    productsPerPage:number;
    handlePageClick: (data: { selected: number }) => void; // 페이지 변경 핸들러
}

const ProductList = ({ selectedCategory, currentPage, productsPerPage, handlePageClick }: ProductListProps) => {
    const [products, setProducts] = useState<IProduct[]>([]); // 모든 상품
    const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]); // 필터된 상품
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc'); // 초기 정렬 상태

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.get('/api/shop');
                setProducts(response.data);
                console.log(response.data);
                setFilteredProducts(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchProducts();
    }, []);

    // 선택한 카테고리에 따른 필터링
    useEffect(() => {
        const filtered = selectedCategory === '전체'
            ? products
            : products.filter(product => product.category === selectedCategory);
        setFilteredProducts(filtered);
    }, [selectedCategory, products]);

    // 가격순 정렬
    const sortedProducts = filteredProducts.sort((a, b) => {
        return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
    });

    // 현재 페이지에 해당하는 상품 계산
    const offset = currentPage * productsPerPage;
    const currentProducts = sortedProducts.slice(offset, offset + productsPerPage);
    const pageCount = Math.ceil(filteredProducts.length / productsPerPage);

    return (
        <>
            <AutoComplete
                items={products}
                setFilteredItems={setFilteredProducts}
                displayProperty="productName"
            />
            <PriceSort sortOrder={sortOrder} setSortOrder={setSortOrder}/>
            <ul className='product-list'>
                {currentProducts.map(product => (
                    <ProductItem
                        key={product.id}
                        product={product}
                    />
                ))}
            </ul>

            {filteredProducts.length > productsPerPage && (
                <Pagination
                    pageCount={pageCount}
                    handlePageClick={handlePageClick}
                />
            )}
        </>
    );
}

export default ProductList
