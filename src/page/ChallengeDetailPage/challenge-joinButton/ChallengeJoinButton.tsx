import styles from './ChallengeJoinButton.module.scss'
import { CiCalendar } from "react-icons/ci";
import api from '../../../api/api';
import { useEffect, useState } from 'react';
import { useModal } from '../../../contexts/ModalProvider';
import Modal from '../../../components/modal';
import { calculatorDday } from '../../../utils/calculatorDday';
import { useOnlyDate } from '../../../utils/useOnlyDate';
import { useNavigate } from 'react-router-dom';

interface ChallengeJoinButtonProps {
    challengeId:string | undefined;
    startDate?:string;
    endDate?:string;
    period?:number;
}

const ChallengeJoinButton = ({challengeId, startDate, endDate, period}:ChallengeJoinButtonProps) => {

    const [disabled, setDisabled] = useState(false);
    const {isOpen, openModal, closeModal} = useModal();
    const [buttonText, setButtonText] = useState('');

    const navigate = useNavigate();

    const fetchJoin = async() => {
        try {
            if(challengeId){
                await api.post('/api/challenge/join', {
                    challengeId,
                });
                console.log('챌린지 참여 성공했습니다!');
                setDisabled(true);
                setButtonText('참여완료');
                openModal();
            }else{
                console.log('challengeId가 없습니다!');
            }
        } catch (error) {
            console.log('참여 데이터 보내기 오류!', error);
        }
    };

    const today = new Date();
    const date = today.toISOString().split('T')[0];
    const countStartDate = calculatorDday(date, startDate ?? '');
    const challengeStart = new Date(startDate ?? "2024-09-06").toISOString().split('T')[0];
    
    const handleClick = () => {
        closeModal();
        navigate('/challenge');
    }
    

    useEffect(() => {
        if (date === challengeStart || date > challengeStart) {
            setButtonText('진행중인 챌린지');
            setDisabled(true);
        }else{
            setButtonText('참여하기');
            setDisabled(false);
        }
    }, [date, challengeStart]);
    

    return (
        <>
        <div className={styles.joinbar}>
            <div className={styles.challenge_schedule}>
                <div className={styles.challenge_schedule_date}>
                    <span>{useOnlyDate(startDate)} - {useOnlyDate(endDate)}</span>
                    <CiCalendar size={20}/>
                </div>
                <span>매일, {period}일동안</span>
            </div>
            <button 
                onClick={fetchJoin}
                disabled={disabled}>{buttonText}</button>
        </div>
        {isOpen && (
            <Modal isOpen={isOpen} onClose={closeModal}>
                <Modal.Header>
                    챌린지 참여
                </Modal.Header>
                <Modal.Title>
                    참여가 완료되었습니다.
                </Modal.Title>
                <Modal.Subtitle>
                    {countStartDate}일 뒤부터 인증을 시작해주세요!
                </Modal.Subtitle>
                <Modal.Footer>
                    <Modal.Button buttonStyle='button--primary' onClick={handleClick}>확인</Modal.Button>
                </Modal.Footer>
            </Modal>
        )}
        </>
    )
}

export default ChallengeJoinButton