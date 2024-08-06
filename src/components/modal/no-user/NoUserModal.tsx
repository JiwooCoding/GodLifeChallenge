import styles from '../../modal/Modal.module.scss'
import loginalert from '../../../image/products/free-icon-warning-752755.png'
import { useNavigate } from 'react-router-dom'
import { useAppdispatch } from '../../../hooks/redux';
import { closeModal } from '../../../store/modal/modal.slice';

const NoUserModal = () => {

    const navigate = useNavigate();

    const dispatch = useAppdispatch();
    const handleLoginRedirect = () => {
        navigate('/login');
        dispatch(closeModal());
    };

    return (
        <div className={styles.modal_login_prompt}>
            <img src={loginalert} alt='login prompt' style={{ width: '30px' }} /> 
            <h1>로그인이 필요합니다</h1>
            <p>계속하시려면 로그인해 주세요.</p>
            <button className={`${styles.modal_button} ${styles.confirm}`} onClick={handleLoginRedirect}>확인</button>
        </div>
    )
}

export default NoUserModal