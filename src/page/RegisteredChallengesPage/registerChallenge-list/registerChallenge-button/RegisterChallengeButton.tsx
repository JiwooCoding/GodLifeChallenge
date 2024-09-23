import api from '../../../../api/api';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import { IChallenge } from '../../../../type/IChallenge';
import ChallengeFinishButton from './challengeFinish-button/ChallengeFinishButton';
import ChallengeButton from '../../../../components/button/challengeButton/ChallengeButton';

interface ButtonProps {
    challengeId:string;
    onDelete:(id:string) => void;
    item:IChallenge;
}

const RegisterChallengeButton = ({item, onDelete, challengeId}:ButtonProps) => {
    

    const navigate = useNavigate();
    //const {isOpen, openModal, closeModal} = useModal();
    

    const deleteChallenge = async() => {
        try {
            await api.delete(`/api/challenge`,{
                params:{
                    challengeId
                }
            });
            console.log('챌린지 삭제 성공');
            onDelete(challengeId);
            //closeModal();
            toast.success('챌린지 삭제가 성공적으로 되었습니다!');
        } catch (error) {
            console.log('챌린지 삭제 오류',error);
            console.log('challengeId-->',challengeId);
        }
    }

    const manageChallenge = () => {
        navigate(`/managePage/${challengeId}`);
    }

    //const today = dayjs().format('YYYY-MM-DD');
    const current = dayjs(); //오늘 날짜&시간
    const startDateTime = dayjs(`${item.startDate} ${item.uploadStartTime}`, 'YYYY-MM-DD HH:mm'); //시작 날짜&시간
    const endDateTime = dayjs(`${item.endDate} ${item.uploadEndTime}`, 'YYYY-MM-DD HH:mm');


    return (
        <>
            <div>
                {current > endDateTime ? (
                    <ChallengeFinishButton/>
                ) : current <= startDateTime ? (
                    <ChallengeButton variant='cancle' onClick={deleteChallenge}>삭제</ChallengeButton>
                ) : (
                    <ChallengeButton variant='confirm' onClick={manageChallenge}>관리</ChallengeButton>
                )}
            </div>
            {/* {isOpen && (
                <Modal isOpen={isOpen} onClose={closeModal}>
                    <Modal.Header>
                        챌린지 삭제
                    </Modal.Header>
                    <Modal.Content>
                        챌린지를 삭제하시겠습니까?
                    </Modal.Content>
                    <Modal.Footer>
                        <Modal.Button buttonStyle='button--secondary' onClick={closeModal}>닫기</Modal.Button>
                        <Modal.Button buttonStyle='button--primary' onClick={deleteChallenge}>확인</Modal.Button>
                    </Modal.Footer>
            </Modal>
            )} */}
            
        </>
    )
}

export default RegisterChallengeButton