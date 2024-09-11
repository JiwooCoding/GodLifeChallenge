import styles from './ChallengeJoinButton.module.scss';
import { CiCalendar } from "react-icons/ci";
import api from '../../../api/api';
import { useEffect, useState } from 'react';
import { useModal } from '../../../contexts/ModalProvider';
import Modal from '../../../components/modal';
import { calculatorDday } from '../../../utils/calculatorDday';
import { useOnlyDate } from '../../../utils/useOnlyDate';
import { useNavigate } from 'react-router-dom';
import InputField from '../../../components/inputField/InputField';
import { useUser } from '../../../contexts/UserProvider';
import { formatNumberWithCommas } from '../../../utils/fomatNumberWithCommas';
import usePointInput from '../../../hooks/usePointInput';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

interface ChallengeJoinButtonProps {
    challengeId: string | undefined;
    startDate?: string; 
    startTime?: string;
    endDate?: string;
    endTime?: string;   
    period: number;
    isJoined: boolean;
}

const ChallengeJoinButton = ({ challengeId, startDate, startTime, endDate, endTime, period, isJoined }: ChallengeJoinButtonProps) => {
    
    const [disabled, setDisabled] = useState(false);
    const [buttonText, setButtonText] = useState('');
    const [activeInput, setActiveInput] = useState('');

    const { isOpen, openModal, closeModal } = useModal();
    const { register } = useForm();
    const { user } = useUser();
    const { customPoint, handleCustomPointChange } = usePointInput(); 

    const [isJoinedState, setIsJoinedState] = useState(isJoined);  

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
    }, [now, challengeStart, challengeEnd, isJoinedState]);  

    const fetchJoin = async () => {
        try {
            if (challengeId) {
                await api.post('/api/challenge/join', {
                    challengeId,
                    deposit: customPoint
                });
                setIsJoinedState(true);  
                setButtonText('참여완료'); 
                setDisabled(true);
                closeModal();
                toast.success(`${todayStr === startDate ? '오늘' : `${diffDays}일 후 `}부터 인증해주세요`);
            } else {
                console.log('challengeId가 없습니다!');
            }
        } catch (error) {
            console.log('참여 데이터 보내기 오류!', error);
        }
    };

    const handleClick = () => {
        openModal();
    };

    const handleFocus = (inputId: string) => {
        setActiveInput(inputId);
    };

    const handleBlur = () => {
        setActiveInput('');
    };

    return (
        <>
            <div className={styles.joinbar}>
                <div className={styles.challenge_schedule}>
                    <div className={styles.challenge_schedule_date}>
                        <span>{useOnlyDate(startDate)} - {useOnlyDate(endDate)}</span>
                        <CiCalendar size={20} />
                    </div>
                    <span>매일, {period+1}일 동안</span>
                </div>
                <button
                    onClick={handleClick}
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
                        <InputField
                            id='deposit'
                            label='예치금'
                            type='text'  
                            placeholder='예치금 입력'
                            value={customPoint} 
                            onChange={handleCustomPointChange} 
                            onFocus={() => handleFocus('deposit')}
                            onBlur={handleBlur}
                            register={register}
                        />
                        <Modal.Button buttonStyle='button--secondary' onClick={closeModal}>닫기</Modal.Button>
                        <Modal.Button buttonStyle='button--primary' onClick={fetchJoin}>확인</Modal.Button>
                    </Modal.Content>
                </Modal>
            )}
        </>
    );
};

export default ChallengeJoinButton;
