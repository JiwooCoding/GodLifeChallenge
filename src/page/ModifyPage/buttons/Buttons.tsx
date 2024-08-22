import Button from '../../../components/button/Button'
import { Link, useNavigate } from 'react-router-dom'
import { useUser } from '../../../contexts/UserProvider';
import styles from '../MyInfoModify.module.scss'
import api from '../../../api/api';
import { useModal } from '../../../contexts/ModalProvider';
import Modal from '../../../components/modal';

const Buttons = () => {

    const navigate = useNavigate();
    const {setUser} = useUser();
    const {isOpen, closeModal, openModal} = useModal();

    const handleModalClose = () => {
        closeModal();
        window.location.replace('/mypage');
    }

    const handleDeleteAccount = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                console.error('엑세스 토큰 없음');
                return;
            }
    
            await api.delete('/api/deleteToken', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
    
            localStorage.removeItem('accessToken');
            setUser(null);
            navigate('/');
    
        } catch (error) {
            console.error('유저 탈퇴 실패', error);
        }
    };
    
    return (
        <>
            <div className={styles.saveAndcancleButton}>
                <div className={styles.delete_account}>
                    <button type='button' className={styles.account_delete_button} onClick={handleDeleteAccount}>탈퇴하기</button>
                </div>
                <div className={styles.modify_account}>
                    <Button type='submit' variant='confirm' onclick={openModal}>저장</Button>
                    <Link to={'/mypage'}>
                        <Button type='button' variant='close'>취소</Button>
                    </Link>
                </div>
            </div>
            {isOpen && (
                <Modal isOpen={isOpen} onClose={closeModal}>
                    <Modal.Header>
                        저장하기
                    </Modal.Header>
                    <Modal.Content>
                        프로필 정보가 업데이트 되었습니다.
                    </Modal.Content>
                    <Modal.Footer>
                        <Modal.Button buttonStyle='button--primary' onClick={handleModalClose}>확인</Modal.Button>
                    </Modal.Footer>
                </Modal>
            )}
        </>
    )
}

export default Buttons