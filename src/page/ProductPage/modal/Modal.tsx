import styles from './Modal.module.scss'
import alert from '../../../image/alert.png'
import checked from '../../../image/checked.png'
import loginalert from '../../../image/products/free-icon-warning-752755.png'

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    points: number;
    isConfirmed?: boolean;
    isLoginPrompt?:boolean;
}

const Modal = ({
        isOpen, 
        onClose, 
        onConfirm, 
        points, 
        isConfirmed = false, 
        isLoginPrompt = false
    }:ModalProps) => {

    if(!isOpen) return null;

    const handleConfirmClick = async() => {
        try {
            await onConfirm();
        } catch (error) {
            console.log('Error confirming purchase => ',error);
        }
    }
    
    return (
        <div className={styles.modal_overlay}>
            <div className={styles.modal_content}>
            {isLoginPrompt ? (
                    <div className={styles.modal_login_prompt}>
                        <img src={loginalert} alt='login prompt' style={{ width: '30px' }} /> 
                        <h1>로그인이 필요합니다</h1>
                        <p>구매를 계속하려면 로그인해 주세요.</p>
                        <button className={`${styles.modal_button} ${styles.confirm}`} onClick={handleConfirmClick}>확인</button>
                    </div>
                ) : isConfirmed ? (
                    <div className={styles.modal_complete}>
                        <img src={checked} alt='checked' style={{ width: '22px' }} />
                        <p>구매가 성공적으로 완료되었습니다!</p>
                        <button className={`${styles.modal_button} ${styles.confirm}`}  onClick={onClose}>확인</button>
                    </div>
                ) : (
                    <div className={styles.modal_purchase}>
                        <img src={alert} alt='alert' style={{ width: '40px' }} />
                        <h1>상품을 구매하시겠습니까?</h1>
                        <p><b>{points}</b> 포인트가 차감됩니다.</p>
                        <p>구매하시겠습니까?</p>
                        <div className={styles.modal_buttons}>
                            <button className={`${styles.modal_button} ${styles.cancle}`} onClick={onClose}>취소</button>
                            <button className={`${styles.modal_button} ${styles.confirm}`} onClick={handleConfirmClick}>확인</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Modal