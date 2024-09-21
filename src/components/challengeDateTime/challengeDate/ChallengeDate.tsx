import { CiCalendar } from 'react-icons/ci'
import styles from './ChallengeDate.module.scss'
import { IChallenge } from '../../../type/IChallenge'
import { calculatorDday } from '../../../utils/calculatorDday';
import { IUserAuth } from '../../../type/IUserAuth';
import { useMemo } from 'react';
import { UserChallengeRecord } from '../../../type/challengeData';

interface ChallengeDateProps {
    challenge:IChallenge | IUserAuth | UserChallengeRecord;
}

const ChallengeDate = ({challenge}:ChallengeDateProps) => {

    const diffDays = useMemo(() => 
        calculatorDday(challenge.startDate, challenge.endDate), 
    [challenge.startDate, challenge.endDate]);


    return (
        <div>
            <h1>챌린지 업로드 기간</h1>
            <div className={styles.challenge_schedule_date}>
                <div className={styles.challenge_date}>
                    <CiCalendar size={22} style={{fontWeight:'bold'}}/>
                    <span>{challenge.startDate} ~ {challenge.endDate}</span>
                </div>
                <div className={styles.challenge_duration}>
                    <span>매일</span>
                    <span>{diffDays === 0 ? '하루' : `${diffDays+1}일 `}동안</span>
                </div>
            </div>
        </div>
    )
}

export default ChallengeDate