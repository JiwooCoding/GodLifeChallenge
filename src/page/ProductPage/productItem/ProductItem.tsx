import { useState, useEffect } from 'react';
import { useAppdispatch } from '../../../hooks/redux';
import { addToCart } from '../../../store/cart/cartSlice';
import { IProduct } from '../../../type/IProduct';
import { formatNumberWithCommas } from '../../../utils/fomatNumberWithCommas';
import styles from './ProductItem.module.scss';
import cart from '../../../image/cart/free-icon-shopping-bag-2956820.png';
import { useModal } from '../../../contexts/ModalProvider';
import Modal from '../../../components/modal';
import { useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

type ProductItemProps = {
    product: IProduct;
}

const ProductItem = ({ product }: ProductItemProps) => {
    const [isLoading, setIsLoading] = useState(true);
    const { isOpen, openModal, closeModal } = useModal();
    const navigate = useNavigate();
    const dispatch = useAppdispatch();

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000); 
    }, []);

    const addItemToCart = () => {
        if (product.stock > 0) {
            dispatch(addToCart(product));
            openModal();
        }
    }

    return (
        <>
            <li key={product.id} className={styles.product_items}>
                <div className={styles.product_item}>
                    {isLoading ? (
                        <>
                            <Skeleton height={200} />
                            <Skeleton width={100} />
                            <Skeleton count={2} />
                        </>
                    ) : (
                        <>
                            {product.stock === 0 && (
                                <div className={styles.soldOutOverlay}>
                                    <span>품절</span>
                                </div>
                            )}
                            <img src={product.productImages} alt={product.productName} className={styles.productImage} />
                            <p className={styles.productCompany}>{product.productCompany}</p>
                            <p className={styles.productName}>{product.productName}</p>
                            <div className={styles.priceNcart}>
                                <p className={styles.productPrice}>{formatNumberWithCommas(product.price)} P</p>
                                {product.stock > 0 && (
                                    <img src={cart} style={{ width: '33px', cursor: 'pointer' }} onClick={addItemToCart} />
                                )}
                            </div>
                        </>
                    )}
                </div>
            </li>

            {isOpen && (
                <Modal isOpen={isOpen} onClose={closeModal}>
                    <Modal.Header>
                        선택완료
                    </Modal.Header>
                    <Modal.Content>
                        장바구니에 추가되었습니다
                    </Modal.Content>
                    <Modal.Footer>
                        <Modal.Button buttonStyle='button--primary' onClick={closeModal}>계속 쇼핑하기</Modal.Button>
                        <Modal.Button buttonStyle='button--secondary' onClick={() => { navigate('/cart'); closeModal(); }}>장바구니 이동</Modal.Button>
                    </Modal.Footer>
                </Modal>
            )}
        </>
    );
}

export default ProductItem;
