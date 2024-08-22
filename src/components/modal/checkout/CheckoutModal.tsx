import React from 'react'
import { useAppSelector } from '../../../hooks/redux'
import { useUser } from '../../../contexts/UserProvider';
import loginalert from '../../../image/products/free-icon-warning-752755.png'
import alert from '../../../image/alert.png'
import styles from './CheckoutModal.module.scss'
import { useModal } from '../../../contexts/ModalProvider';

interface CheckoutModalProps {
    sendOrder: () => void;
}

const CheckoutModal = ({sendOrder}:CheckoutModalProps) => {
    
    const cart = useAppSelector((state) => state.cartSlice); 
    const {user} = useUser();
    const {closeModal} = useModal();

    return (
        <div>
            {/* user.totalPoint가 undefined일 경우 0으로 처리 */}
            {cart.totalPrice > (user?.totalPoint ?? 0) ? (
                <div className={styles.modal_purchase}>
                    <img src={loginalert} alt='alert' style={{width:'30px'}}/>
                    <h1>포인트가 부족합니다!</h1>
                    <div className={styles.modal_buttons}>
                        <button className={`${styles.modal_button} ${styles.cancle}`} onClick={closeModal}>확인</button>
                    </div>
                </div>
            ) : (
                <div className={styles.modal_purchase}>
                    {/* <img src={alert} alt='alert' style={{ width: '40px' }} /> */}
                    <p><b>{cart.totalPrice}</b> 포인트가 차감됩니다.</p>
                    <p>구매하시겠습니까?</p>
                    <div className={styles.modal_buttons}>
                        <button className={`${styles.modal_button} ${styles.cancle}`} onClick={closeModal}>취소</button>
                        <button className={`${styles.modal_button} ${styles.confirm}`} onClick={sendOrder}>확인</button>
                    </div>
                </div>
            ) }
        </div>
    )
}

export default CheckoutModal