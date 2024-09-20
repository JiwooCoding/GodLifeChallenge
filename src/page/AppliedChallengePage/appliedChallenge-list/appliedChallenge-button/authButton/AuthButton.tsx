import { useState } from 'react'
import api from '../../../../../api/api';
import { useUser } from '../../../../../contexts/UserProvider';
import { SubmitHandler } from 'react-hook-form';
import styles from './AuthButton.module.scss'
import AuthChallenge from '../../../../../components/modal/authImage/AuthChallenge';
import { isWithinTimeRange } from '../../../../../utils/isWithinTimeRange';
import dayjs, { Dayjs } from 'dayjs';
import CancleButton from '../cancleButton/CancleButton';
import { isTodayWithinRange } from '../../../../../utils/isTodayWithinRange';

export interface FormData {
    images: FileList;
    description:string;
}

interface ParticipationButtonProps {
    challengeId: string;
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    title: string;
    todayStr:string;
    today: Dayjs;
    hasCheckedIn:boolean;
}

const AuthButton = ({ hasCheckedIn, challengeId, startDate, endDate, startTime, endTime, title, today, todayStr }: ParticipationButtonProps) => {
    
    const [isOpen, setIsOpen] = useState(false);

    const modalOpen = () => setIsOpen(true);
    const modalClose = () => setIsOpen(false);

    const uploadAuth: SubmitHandler<FormData> = async (data) => {

        const formData = new FormData();
        formData.append('image', data.images[0]);

        try {
            await api.post(`/api/challenge/${challengeId}/posts`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            modalClose();
        } catch (error) {
            console.log('챌린지 인증 실패', error);
        }
    };

    const endDateTime = dayjs(`${endDate} ${endTime}`, 'YYYY-MM-DD HH:mm');

    return (
        <>
            <div className={styles.button_box}>
                {today > endDateTime ? (
                        <p></p>
                    ) : isTodayWithinRange(startDate, endDate, todayStr) ? (
                        isWithinTimeRange(startTime, endTime) ? (
                            <button className={styles.button} onClick={modalOpen} disabled={hasCheckedIn}>{
                                hasCheckedIn === true ? '인증완료' : '인증하기'}
                            </button>
                        ) : (
                            <button className={styles.button} disabled={true}>인증불가</button>
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

export default AuthButton;
