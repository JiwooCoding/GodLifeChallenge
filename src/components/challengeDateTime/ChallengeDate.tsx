import { CiCalendar } from 'react-icons/ci'
import styles from '../../page/ChallengeDetailPage/ChallengeDetailPage.module.scss'
import { IChallenge } from '../../type/IChallenge'

interface ChallengeDateProps {
    challenge:IChallenge;
}

const ChallengeDate = ({challenge}:ChallengeDateProps) => {
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
                    <span>1일 동안</span>
                </div>
            </div>
        </div>
    )
}

export default ChallengeDate