import { toast } from 'react-toastify';
import api from '../../../../../api/api'
import Modal from '../../../../../components/modal';
import { useModal } from '../../../../../contexts/ModalProvider';
import styles from './CancleButton.module.scss'
import ChallengeButton from '../../../../../components/button/challengeButton/ChallengeButton';

interface CancleButtonProps {
    challengeId:string;
    onCancle:(id:string) => void;
}

const CancleButton = ({challengeId, onCancle}:CancleButtonProps) => {

    const {isOpen, openModal, closeModal} = useModal();
    
    const handleClick = async() => {
        try {
            // POST 요청으로 수정
            await api.post('/api/challenge/leave', null, {
                params: {
                    challengeId: challengeId
                }
            });
            closeModal();
            onCancle(challengeId);
            toast.success('챌린지 취소가 완료되었습니다!');
        } catch (error) {
            console.log('챌린지 취소 실패했습니다!', error);
        }
    }

    return (
        <div>
            <ChallengeButton variant='cancle' onClick={openModal}>취소</ChallengeButton>
            {isOpen && (
                <Modal isOpen={isOpen} onClose={closeModal}>
                    <Modal.Header>
                        취소하기
                    </Modal.Header>
                    <Modal.Content>
                        챌린지를 취소하시겠습니까?
                    </Modal.Content>
                    <Modal.Footer>
                        <Modal.Button buttonStyle='button--secondary' onClick={closeModal}>닫기</Modal.Button>
                        <Modal.Button buttonStyle='button--primary' onClick={handleClick}>확인</Modal.Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    )
}

export default CancleButton;
