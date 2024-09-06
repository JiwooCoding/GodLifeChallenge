import api from '../../../../../api/api'
import Modal from '../../../../../components/modal';
import { useModal } from '../../../../../contexts/ModalProvider';

const CancleButton = ({challengeId}:{challengeId:string}) => {

    const {isOpen, openModal, closeModal} = useModal();
    
    const handleClick = async() => {
        try {
            await api.delete('/api/challenge/leave',{
                data:{
                    id:challengeId
                }
            });
            closeModal();
        } catch (error) {
            console.log('챌린지 취소 실패했습니다!',error);
        }
    }

    return (
        <div>
            <button onClick={openModal}>취소하기</button>
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

export default CancleButton