import { useState } from 'react';
import { categories } from '../../data/productsData';
import styles from './Product.module.scss';
import Modal from './modal/Modal';
import ProductList from './productList/ProductList';
import GiftPoint from '../../components/giftPoint/GiftPoint';
import api from '../../api/api';
import { useUser } from '../../UserProvider';
import { useNavigate } from 'react-router-dom';


const ProductPage = () => {

  const [selectedCategory, setSeletedCategory] = useState('전체');
  const [activeButtonIndex, setActiveButtonIndex] = useState<number>(0); 
  const [currentPage, setCurrentPage] = useState<number>(0); //현재 페이지
  const [productsPerPage] = useState<number>(20); //한페이지당 보여줄 상품 수
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductPoints, setSelectedProductPoints] = useState<number>(0);
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  const [isLoginPrompt, setIsLoginPrompt] = useState<boolean>(false);

  const {user} = useUser();
  const navigate = useNavigate();

  //카테고리 선택 핸들러
  const handleCategoryChange = (category: string, index: number) => {
    setSeletedCategory(category);
    setActiveButtonIndex(index);
    setCurrentPage(0);
  };

  
  //상품 포인트 서버에 전달
  const purchaseProduct = async(productPoints:number) => {
    try {
      const response = await api.post('/api/point/totalPoints', {
        productPoints: productPoints
      })
      console.log('포인트가 성공적으로 전달되었습니다.', response.data);
    } catch (error) {
      console.log('포인트 전달 중 오류가 발생했습니다.', error);
    }
  };

  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected);
  }


  const handlePurchaseClick = (productPoints:number) => {
    if(user){
      setSelectedProductPoints(productPoints);
      setIsModalOpen(true);
      setIsConfirmed(false);
      setIsLoginPrompt(false);
    }else{
      setIsLoginPrompt(true);
      setIsModalOpen(true);
    }
  };

  const handleModalConfirm = async() => {
    if(user){
      await purchaseProduct(selectedProductPoints);
      setIsConfirmed(true);
    }else{
      navigate('/login');
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  }


  return (
    <div className="inner">
      <div className="mt-10 text-center">
        <h2 className="text-[30px] font-bold mb-4">포인트 쇼핑</h2>
        {/* <p className="text-[15px] text-gray-500 font-light">다양한 제휴사에서 더 특별한 혜택을 즐기실 수 있어요!</p> */}
      </div>
      <div className="flex gap-10 justify-center mt-10 mb-10">
        {categories.map((category, index) => (
          <button
            key={category.name}
            onClick={() => handleCategoryChange(category.name, index)}
            className={`${styles.category_button_wrapper} ${activeButtonIndex === index ? styles.active : ''}`}
          >
            <div className={styles.hover}>
              <div className={`${styles.category_button} ${activeButtonIndex === index ? styles.active : ''}`}>
                <img src={category.categoryImage} alt={category.name} style={{ width: '50px', height: 'auto' }} />
              </div>
              <p className={styles.category_name}>{category.name}</p>
            </div>
          </button>
        ))}
      </div>

      {selectedCategory === '포인트 전환' ? (
        <GiftPoint/>
      ) : (
        <ProductList 
          selectedCategory={selectedCategory}
          currentPage={currentPage}
          productsPerPage={productsPerPage}
          handlePageClick={handlePageClick}
          handlePurchaseClick={handlePurchaseClick}
        />
      )}
      

      <Modal
      isOpen={isModalOpen}
      onClose={handleModalClose}
      onConfirm={handleModalConfirm}
      points={selectedProductPoints}
      isConfirmed={isConfirmed}
      isLoginPrompt={isLoginPrompt}
      />


    </div>
  )
}

export default ProductPage;
