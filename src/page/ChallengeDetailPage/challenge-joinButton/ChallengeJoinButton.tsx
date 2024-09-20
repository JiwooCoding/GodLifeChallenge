import styles from './ChallengeJoinButton.module.scss';
import { CiCalendar } from "react-icons/ci";
import api from '../../../api/api';
import { useEffect, useState } from 'react';
import { useModal } from '../../../contexts/ModalProvider';
import Modal from '../../../components/modal';
import { calculatorDday } from '../../../utils/calculatorDday';
import { useOnlyDate } from '../../../utils/useOnlyDate';
import { useUser } from '../../../contexts/UserProvider';
import { formatNumberWithCommas } from '../../../utils/fomatNumberWithCommas';
import usePointInput from '../../../hooks/usePointInput';
import { toast } from 'react-toastify';
import useActiveInput from '../../../hooks/useActiveInput';
import { IoIosCloseCircle } from "react-icons/io";

interface ChallengeJoinButtonProps {
    challengeId?: string;
    startDate?: string; 
    startTime?: string;
    endDate?: string;
    endTime?: string;   
    period: number;
    isJoined: boolean;
    limitParticipants?:number;
    participants?:number;
}

const ChallengeJoinButton = ({ challengeId, startDate, startTime, endDate, endTime, period, isJoined, limitParticipants, participants }: ChallengeJoinButtonProps) => {
    
    const [disabled, setDisabled] = useState(false);
    const [buttonText, setButtonText] = useState('');
    const [isJoinedState, setIsJoinedState] = useState(isJoined);
    
    const { activeInput, handleFocus, handleBlur } = useActiveInput();
    const { isOpen, openModal, closeModal } = useModal();
    const { user } = useUser();
    const { customPoint, handleCustomPointChange, setCustomPoint } = usePointInput(); 

    const now = new Date();
    const challengeStart = new Date(`${startDate}T${startTime}`);
    const challengeEnd = new Date(`${endDate}T${endTime}`);
    const todayStr = now.toISOString().split('T')[0];
    const diffDays = calculatorDday(now.toISOString(), startDate!);

    useEffect(() => {
        setIsJoinedState(isJoined);
    }, [isJoined]);

    useEffect(() => {
        if (now >= challengeEnd) {
            setButtonText('챌린지 종료');
            setDisabled(true);
        } else if (participants! >= limitParticipants!) {
            setButtonText('모집인원 초과로 참여 불가');
            setDisabled(true);
        } else if (now >= challengeStart && now <= challengeEnd) {
            setButtonText('챌린지 진행중');
            setDisabled(true);
        } else if (!isJoinedState) {  
            setButtonText('참여하기');
            setDisabled(false);
        } else {
            setButtonText('참여완료');
            setDisabled(true);
        }
    }, [now, challengeStart, challengeEnd, isJoinedState, participants, limitParticipants]);

    const fetchJoin = async () => {
        if (!customPoint || customPoint.trim() === '' || customPoint === '0') {
            alert('예치금을 입력해주세요!');
            return;
        }
        try {
            if (challengeId) {
                const depositValue = parseFloat(customPoint.replace(/,/g, ''));
                await api.post('/api/challenge/join', {
                    challengeId,
                    deposit: depositValue
                });
                setIsJoinedState(true);  
                setButtonText('참여완료'); 
                setDisabled(true);
                closeModal();
                toast.success(`${todayStr === startDate ? '오늘' : `${diffDays+1}일 후 `}부터 인증해주세요`);
            } else {
                console.log('challengeId가 없습니다!');
            }
        } catch (error) {
            console.log('참여 데이터 보내기 오류!', error);
        }
    };

    const clearInput = () => {
        setCustomPoint('');
    };

    return (
        <>
            <div className={styles.joinbar}>
                <div className={styles.challenge_schedule}>
                    <div className={styles.challenge_schedule_date}>
                        <span>{useOnlyDate(startDate)} - {useOnlyDate(endDate)}</span>
                        <CiCalendar size={20} />
                    </div>
                    <span>매일, {period === 0 ? '하루' : `${period}일 `}동안</span>
                </div>
                <button
                    onClick={openModal}
                    disabled={disabled}>{buttonText}
                </button>
            </div>
            
            {isOpen && (
                <Modal isOpen={isOpen} onClose={closeModal}>
                    <Modal.Header>
                        예치금 입력
                    </Modal.Header>
                    <Modal.Content>
                            <p className={styles.userpoint}>보유포인트 {formatNumberWithCommas(user?.totalPoint!)}P</p>
                            <div className={styles.deposit}>
                                <label htmlFor='deposit'>예치금</label>
                                <input
                                    id='deposit'
                                    type='text'  
                                    className={`${activeInput ? `${styles.active}` : ''}`}
                                    placeholder='예치금 입력'
                                    value={customPoint} 
                                    onChange={handleCustomPointChange} 
                                    onFocus={() => handleFocus('deposit')}
                                    onBlur={handleBlur}
                                />
                                <IoIosCloseCircle className={styles.cancleIcon} onClick={clearInput}/>
                            </div>
                    </Modal.Content>
                    <Modal.Footer>
                        <Modal.Button buttonStyle='button--secondary' onClick={closeModal}>닫기</Modal.Button>
                        <Modal.Button buttonStyle='button--primary' onClick={fetchJoin}>확인</Modal.Button>
                    </Modal.Footer>
                </Modal>
            )}
        </>
    );
};

export default ChallengeJoinButton;
