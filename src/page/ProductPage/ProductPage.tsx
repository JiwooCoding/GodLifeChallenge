import { useState, useEffect } from 'react';
import products from '../../data/productsData';
import { categories } from '../../data/productsData';
import './Product.css';
import axios from 'axios';

interface ProductsProps { 
  totalPoints: number;
}

const ProductPage = ({ totalPoints }: ProductsProps) => {

  const [selectedCategory, setSeletedCategory] = useState('전체');
  const [activeButtonIndex, setActiveButtonIndex] = useState<number>(0); 

  //카테고리 선택 핸들러
  const handleCategoryChange = (category: string, index: number) => {
    setSeletedCategory(category);
    setActiveButtonIndex(index);
  };

  //선택한 카테고리에 따른 필터링
  const filterProducts = selectedCategory === '전체'
    ? products
    : products.filter(product => product.category === selectedCategory);

  
  //상품 포인트 서버에 전달
  const purchaseProduct = async(productPoints:number) => {
    try {
      const response = await axios.post('https://주소/api/point/totalPoints', {
        productPoints: productPoints
      })
      console.log('포인트가 성공적으로 전달되었습니다.', response.data);
    } catch (error) {
      console.log('포인트 전달 중 오류가 발생했습니다.', error);
    }
  };


  return (
    <div className='inner'>
      <div className='mt-10 text-center'>
        <h2 className='text-[30px] font-bold mb-4'>제휴사 안내</h2>
        <p className='text-[15px] text-gray-500 font-light'>다양한 제휴사에서 더 특별한 혜택을 즐기실 수 있어요!</p>
      </div>
      <div className='flex gap-10 justify-center mt-10 mb-10'>
        {categories.map((category, index) => (
          <button
            key={category.name}
            onClick={() => handleCategoryChange(category.name, index)}
            className={`category_button_wrapper ${activeButtonIndex === index ? 'active' : ''}`}
          >
            <div className='hover'>
              <div className={`category_button ${activeButtonIndex === index ? 'active' : ''}`}>
                <img src={category.categoryImage} alt={category.name} style={{ width: '35px', height: 'auto' }} />
              </div>
              <p className='category_name'>{category.name}</p>
            </div>
          </button>
        ))}
      </div>

      
      {/* 필터링된 상품 목록 */}
      <ul className='product-list'>
        {filterProducts.map(product => (
          <li key={product.id} className='product-item'>
            <div className='flex flex-col items-center'>
              <img src={product.imageUrl} alt={product.name} style={{ width: '80px', height: 'auto' }} />
              <p>{product.name}</p>
              <p>{product.price} P</p>
              <button className='product_button' onClick={() => purchaseProduct(product.price)}>구매하기</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ProductPage;
