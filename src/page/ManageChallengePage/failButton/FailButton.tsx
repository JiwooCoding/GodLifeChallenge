import { useState } from 'react'
import api from '../../../api/api';
import { useParams } from 'react-router-dom';
import { useModal } from '../../../contexts/ModalProvider';
import Modal from '../../../components/modal';
import { toast } from 'react-toastify';

type RouteParmas = {
    challengeId:string;
    postId:string;
}

const FailButton = () => {

    const {challengeId, postId} = useParams<RouteParmas>();
    const {isOpen, openModal, closeModal} = useModal();

    const [disabled, setDisabled] = useState(false);

    const handleClickFail = async() => {
        try {
            await api.post(`/api/challenge/${challengeId}/check-status/${postId}`,{
                status:"fail"
            });
            setDisabled(true);
            closeModal();
            toast.success('인증실패 처리가 완료되었습니다!')
        } catch (error) {
            console.log('인증실패처리 실패!',error);
        }
    }

    return (
        <>
        <button onClick={openModal} disabled={disabled}>인증실패</button>
        {isOpen && (
            <Modal isOpen={isOpen} onClose={closeModal}>
                <Modal.Header>
                    인증실패 처리
                </Modal.Header>
                <Modal.Content>
                    인증실패 처리를 하시겠습니까?
                </Modal.Content>
                <Modal.Footer>
                    <Modal.Button buttonStyle='button--secondary' onClick={closeModal}>취소</Modal.Button>
                    <Modal.Button buttonStyle='button--primary' onClick={handleClickFail}>확인</Modal.Button>
                </Modal.Footer>
            </Modal>
        )}
        </>
    )
}

export default FailButton