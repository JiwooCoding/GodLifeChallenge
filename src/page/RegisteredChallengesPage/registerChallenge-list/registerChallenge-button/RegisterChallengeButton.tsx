import api from '../../../../api/api';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import styles from './RegisterChallengeButton.module.scss'

interface ButtonProps {
    challengeId:string;
    startDate:string;
    startTime:string;
    endDate:string;
    endTime:string;
}

const RegisterChallengeButton = ({challengeId, startDate, startTime, endDate, endTime}:ButtonProps) => {

    const navigate = useNavigate();

    const deleteChallenge = async(challengeId:string) => {
        try {
            await api.delete(`/api/challenge`,{
                data:{
                    id:challengeId
                }
            });
            console.log('챌린지 삭제 성공');
        } catch (error) {
            console.log('챌린지 삭제 오류',error);
        }
    }

    const manageChallenge = () => {
        navigate('/managePage');
    }

    //const today = dayjs().format('YYYY-MM-DD');
    const current = dayjs(); //오늘 날짜&시간
    const startDateTime = dayjs(`${startDate} ${startTime}`, 'YYYY-MM-DD HH:mm'); //시작 날짜&시간
    const endDateTime = dayjs(`${endDate} ${endTime}`, 'YYYY-MM-DD HH:mm');


    return (
        <div>
            {current > endDateTime ? (
                '챌린지 종료'
            ) : current <= startDateTime ? (
                <button className={styles.delete_button} onClick={() => deleteChallenge(challengeId)}>삭제</button>
            ) : (
                <button className={styles.manage_button} onClick={manageChallenge}>관리</button>
            )}
        </div>
    )
}

export default RegisterChallengeButton