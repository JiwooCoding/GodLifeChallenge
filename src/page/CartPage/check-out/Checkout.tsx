import React, { useEffect } from 'react';
import styles from './Checkout.module.scss';
import { useAppdispatch, useAppSelector } from '../../../hooks/redux';
import { useUser } from '../../../contexts/UserProvider';
import { getTotalPrice, postOrder } from '../../../store/cart/cartSlice';
import { Link } from 'react-router-dom';
import CheckoutModal from '../../../components/modal/checkout/CheckoutModal';
import { formatNumberWithCommas } from '../../../utils/fomatNumberWithCommas';
import { useModal } from '../../../contexts/ModalProvider';
import Modal from '../../../components/modal';
import { toast } from 'react-toastify';

const CheckOut = () => {

  const dispatch = useAppdispatch();
  const cart = useAppSelector((state) => state.cartSlice);
  const { user } = useUser();
  const { isOpen, openModal, closeModal } = useModal();

  useEffect(() => {
    dispatch(getTotalPrice());
  }, [cart]);

  const sendOrder = () => {
    dispatch(postOrder(cart));
    closeModal(); // 주문 후 모달 닫기
    toast.success('구매가 완료되었습니다');
  };



  return (
    <>
      <div className={styles.checkout}>
        <div>
          <p>
            <span className={styles.totalPrice_text}>총 예상 금액</span>
            <span className={styles.totalPrice_amount}><b>{formatNumberWithCommas(cart.totalPrice)}</b> 포인트</span>
          </p>
          {!user ? (
            <Link to={'/login'} className={styles.checkout_button}><span>로그인</span></Link>
          ) : (
            <button className={styles.checkout_button} onClick={openModal}>
              구매하기
            </button>
          )}
        </div>
      </div>
      {isOpen && (
        <Modal isOpen={isOpen} onClose={closeModal}>
          <Modal.Header>
            구매하기
          </Modal.Header>
          <Modal.Content>
            <CheckoutModal sendOrder={sendOrder} />
          </Modal.Content>
        </Modal>
      )}
    </>
  );
};

export default CheckOut;
