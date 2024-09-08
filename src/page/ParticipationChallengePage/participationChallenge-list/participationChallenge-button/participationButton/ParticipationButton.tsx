import { useState } from 'react'
import api from '../../../../../api/api';
import { calculatorDday } from '../../../../../utils/calculatorDday';
import { useUser } from '../../../../../contexts/UserProvider';
import { SubmitHandler } from 'react-hook-form';
import styles from './ParticipationButton.module.scss'
import AuthChallenge from '../../../../../components/modal/authImage/AuthChallenge';

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

    return (
        <>
            <div className={styles.button}>
                <button onClick={modalOpen} disabled={disabled}>인증하기</button>
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
