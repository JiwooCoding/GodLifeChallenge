import styles from './ChallengeJoinButton.module.scss';
import { CiCalendar } from "react-icons/ci";
import api from '../../../api/api';
import { useEffect, useState } from 'react';
import { useModal } from '../../../contexts/ModalProvider';
import Modal from '../../../components/modal';
import { calculatorDday } from '../../../utils/calculatorDday';
import { useOnlyDate } from '../../../utils/useOnlyDate';
import { useNavigate } from 'react-router-dom';

interface ChallengeJoinButtonProps {
    challengeId: string | undefined;
    startDate?: string; // 챌린지 시작 날짜
    startTime?: string; // 챌린지 시작 시간 (HH:mm 형식)
    endDate?: string;   // 챌린지 종료 날짜
    endTime?: string;   // 챌린지 종료 시간 (HH:mm 형식)
    period?: number;
    isJoined: boolean;
}

const ChallengeJoinButton = ({ challengeId, startDate, startTime, endDate, endTime, period, isJoined }: ChallengeJoinButtonProps) => {
    const [disabled, setDisabled] = useState(false);
    const { isOpen, openModal, closeModal } = useModal();
    const [buttonText, setButtonText] = useState('');

    const navigate = useNavigate();

    const fetchJoin = async () => {
        try {
            if (challengeId) {
                await api.post('/api/challenge/join', {
                    challengeId,
                });
                setDisabled(true);
                setButtonText('참여완료');
                openModal();
            } else {
                console.log('challengeId가 없습니다!');
            }
        } catch (error) {
            console.log('참여 데이터 보내기 오류!', error);
        }
    };

    // 현재 시간
    const now = new Date();

    // startDate와 startTime을 결합
    const challengeStart = new Date(`${startDate}T${startTime}`);

    // endDate와 endTime을 결합
    const challengeEnd = new Date(`${endDate}T${endTime}`);
    
    const handleClick = () => {
        closeModal();
        navigate('/challenge');
    };

    useEffect(() => {
        // 챌린지가 종료된 경우
        if (now >= challengeEnd) {
            setButtonText('챌린지 종료');
            setDisabled(true);
        }
        // 현재 시간이 시작일과 종료일 사이일 경우 "챌린지 진행중"
        else if (now >= challengeStart && now <= challengeEnd) {
            setButtonText('챌린지 진행중');
            setDisabled(true);
        }
        // 챌린지 시작 전이면서 참여하지 않은 경우
        else if (!isJoined) {
            setButtonText('참여하기');
            setDisabled(false);
        }
        // 이미 참여한 경우
        else if (isJoined) {
            setButtonText('참여완료');
            setDisabled(true);
        }
    }, [now, challengeStart, challengeEnd, isJoined]);

    return (
        <>
            <div className={styles.joinbar}>
                <div className={styles.challenge_schedule}>
                    <div className={styles.challenge_schedule_date}>
                        <span>{useOnlyDate(startDate)} - {useOnlyDate(endDate)}</span>
                        <CiCalendar size={20} />
                    </div>
                    <span>매일, {period}일 동안</span>
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
                        {calculatorDday(now.toISOString(), startDate ?? '')}일 뒤부터 인증을 시작해주세요!
                    </Modal.Subtitle>
                    <Modal.Footer>
                        <Modal.Button buttonStyle='button--primary' onClick={handleClick}>확인</Modal.Button>
                    </Modal.Footer>
                </Modal>
            )}
        </>
    );
};

export default ChallengeJoinButton;
