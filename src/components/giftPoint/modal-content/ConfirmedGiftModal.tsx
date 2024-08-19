import React from 'react'
import styles from './ConfirmedGiftModal.module.scss'
import alert from '../../../image/alert.png'

interface ConfirmedGiftModalProps {
    onConfirm: () => void;
    onClose: () => void;
}

const ConfirmedGiftModal = ({onConfirm, onClose}:ConfirmedGiftModalProps) => {
    return (
        <div className={styles.modal_purchase}>
            <img src={alert} alt='alert' style={{ width: '40px' }} />
            <h1>선물하기를 계속하시겠습니까?</h1>
            {/* <p><b>{cart.totalPrice}</b> 포인트가 차감됩니다.</p> */}
            <div className={styles.modal_buttons}>
                <button 
                    className={`${styles.modal_button} ${styles.confirm}`} 
                    onClick={onConfirm}
                >
                    확인
                </button>
                <button 
                    className={`${styles.modal_button} ${styles.cancle}`} 
                    onClick={onClose}
                >
                    닫기
                </button>
            </div>
        </div>
    )
}

export default ConfirmedGiftModal