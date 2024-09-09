import { useState } from 'react'
import api from '../../../../../api/api';
import { calculatorDday } from '../../../../../utils/calculatorDday';
import { useUser } from '../../../../../contexts/UserProvider';
import { SubmitHandler } from 'react-hook-form';
import styles from './ParticipationButton.module.scss'
import AuthChallenge from '../../../../../components/modal/authImage/AuthChallenge';
import { isWithinTimeRange } from '../../../../../utils/isWithinTimeRange';
import dayjs from 'dayjs';
import CancleButton from '../cancleButton/CancleButton';

export interface FormData {
    description: string;
    images: FileList;
}

interface ParticipationButtonProps {
    challengeId: string;
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    title: string;
}

const ParticipationButton = ({ challengeId, startDate, endDate, startTime, endTime, title }: ParticipationButtonProps) => {
    const [disabled, setDisabled] = useState(false);
    const [participationStatus, setParticipationStatus] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const modalOpen = () => setIsOpen(true);
    const modalClose = () => setIsOpen(false);

    const { user } = useUser();

    const uploadAuth: SubmitHandler<FormData> = async (data) => {

        const formData = new FormData();
        formData.append('title', data.description);
        formData.append('image', data.images[0]);


        for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }

        try {
            await api.post(`/api/challenge/${challengeId}/posts`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setDisabled(true);
            setParticipationStatus(true);
            modalClose();
        } catch (error) {
            console.log('챌린지 인증 실패', error);
        }
    };

    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    const current = dayjs(); //오늘 날짜&시간
    const endDateTime = dayjs(`${endDate} ${endTime}`, 'YYYY-MM-DD HH:mm');

    return (
        <>
            <div className={styles.button_box}>
                {current > endDateTime ? (
                        <p>종료된 챌린지</p>
                    ) : todayStr === startDate ? (
                        isWithinTimeRange(startTime, endTime) ? (
                            <button onClick={modalOpen} disabled={disabled}>인증하기</button>
                        ) : (
                            <button className={styles.button} disabled={true}>인증불가시간</button>
                        )
                    ) : todayStr < startDate ? (
                        <div className={styles.buttons}>
                            <CancleButton
                                challengeId={challengeId}
                            />
                        </div>
                    ) : null}
            </div>
            {isOpen && (
                <AuthChallenge
                    uploadAuth={uploadAuth}
                    modalClose={modalClose}
                    title={title}
                />
            )}
        </>
    );
}

export default ParticipationButton;
