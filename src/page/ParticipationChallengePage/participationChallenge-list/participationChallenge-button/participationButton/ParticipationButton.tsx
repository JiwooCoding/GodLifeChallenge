import { useState } from 'react'
import api from '../../../../../api/api';
import { calculatorDday } from '../../../../../utils/calculatorDday';
import { isWithinTimeRange } from '../../../../../utils/isWithinTimeRange';
import { useModal } from '../../../../../contexts/ModalProvider';
import Modal from '../../../../../components/modal';
import ImageField from '../../../../../components/imageField/ImageField';

interface ParticipationButtonProps {
    challengeId:string;
    startDate:string;
    endDate:string;
    startTime:string;
    endTime:string;
}

const ParticipationButton = ({challengeId, startDate, endDate, startTime, endTime}:ParticipationButtonProps) => {
    
    const [disabled, setDisabled] = useState(false);
    const [participationStatus, setPaticipationStatus] = useState(false); //챌린지 참여여부 => 재참여 막기위함

    const {isOpen, openModal, closeModal} = useModal();

    // POST /api/challenge/{challengeId}/posts  => 인증
    //const {challengeId} = useParams<RouteParams>();

    const uploadAuthPhoto = async() => {
        try {
            await api.post(`/api/challenge/${challengeId}/posts`,{
                
            });
            setDisabled(true);
            setPaticipationStatus(true);
            closeModal();
        } catch (error) {
            console.log('챌린지 인증 실패',error);
        }
    }

    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    const Dday = calculatorDday(todayStr,startDate);
    
    return (
        <>
            <div>
                {todayStr > endDate ? (
                    <button disabled={true}>종료된 챌린지</button>
                ) : todayStr === startDate ? (
                    isWithinTimeRange(startTime, endTime) ? (
                        <button onClick={openModal} disabled={disabled}>인증하기</button>
                    ) : (
                        <button disabled={true}>인증불가시간</button>
                    )
                ) : todayStr < startDate ? (
                    <button>D-{Dday}</button>
                ) : null}
            </div>
            {isOpen && (
                <Modal isOpen={isOpen} onClose={closeModal}>
                    <Modal.Header>
                        인증하기
                    </Modal.Header>
                    <Modal.Content>
                        사진 업로드
                    </Modal.Content>
                    <Modal.Footer>
                        <Modal.Button onClick={uploadAuthPhoto}>업로드</Modal.Button>
                    </Modal.Footer>
                </Modal>
            )}
        </>
    )
}

export default ParticipationButton