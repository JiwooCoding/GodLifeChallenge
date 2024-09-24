import { useState } from 'react'
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../../../api/api';

type RouteParmas = {
    challengeId:string;
    postId:string;
}

const FailButton = ({postId}:{postId:string}) => {

    const {challengeId} = useParams<RouteParmas>();
    //const {isOpen, openModal, closeModal} = useModal();

    const [disabled, setDisabled] = useState(false);

    const handleClickFail = async() => {
        try {
            await api.put(`/api/challenge/${challengeId}/check-status/${postId}`, null, {
                params: { 
                    status: "인증실패"
                }
            });
            console.log('postId',postId);
            console.log('challengeId', challengeId)
            setDisabled(true);
            //closeModal();
            toast.success('인증실패 처리가 완료되었습니다!');
        } catch (error) {
            console.log('인증실패처리 실패!', error);
            console.log('postId',postId);
            console.log('challengeId', challengeId)
        }
    }

    return (
        <>
        <button onClick={handleClickFail} disabled={disabled}>인증실패</button>
        {/* {isOpen && (
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
        )} */}
        </>
    )
}

export default FailButton