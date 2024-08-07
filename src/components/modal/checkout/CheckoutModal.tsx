import React from 'react'
import { useAppdispatch, useAppSelector } from '../../../hooks/redux'
import { useUser } from '../../../UserProvider';
import loginalert from '../../../image/products/free-icon-warning-752755.png'
import alert from '../../../image/alert.png'
import { closeModal } from '../../../store/modal/modal.slice';
import styles from './CheckoutModal.module.scss'

interface CheckoutModalProps {
    sendOrder: () => void;
}

const CheckoutModal = ({sendOrder}:CheckoutModalProps) => {
    
    const dispatch = useAppdispatch();
    const cart = useAppSelector((state) => state.cartSlice); 
    const {user} = useUser();

    const onClose = () => {
        dispatch(closeModal());
    }

    

    return (
        <div>
            {/* user.totalPoint가 undefined일 경우 0으로 처리 */}
            {cart.totalPrice > (user?.totalPoint ?? 0) ? (
                <div className={styles.modal_purchase}>
                    <img src={loginalert} alt='alert' style={{width:'30px'}}/>
                    <h1>포인트가 부족합니다!</h1>
                    <div className={styles.modal_buttons}>
                        <button className={`${styles.modal_button} ${styles.cancle}`} onClick={onClose}>확인</button>
                    </div>
                </div>
            ) : (
                <div className={styles.modal_purchase}>
                    <img src={alert} alt='alert' style={{ width: '40px' }} />
                    <h1>상품을 구매하시겠습니까?</h1>
                    <p><b>{cart.totalPrice}</b> 포인트가 차감됩니다.</p>
                    <p>구매하시겠습니까?</p>
                    <div className={styles.modal_buttons}>
                        <button className={`${styles.modal_button} ${styles.cancle}`} onClick={onClose}>취소</button>
                        <button className={`${styles.modal_button} ${styles.confirm}`} onClick={sendOrder}>확인</button>
                    </div>
                </div>
            ) }
        </div>
    )
}

export default CheckoutModal