import { IChallenge } from '../../../type/IChallenge'
import { IUserAuth } from '../../../type/IUserAuth'
import styles from './ChallengeTime.module.scss'
const ChallengeTime = ({challenge}:{challenge:IChallenge | IUserAuth}) => {
    return (
        <div>
            <h1>챌린지 업로드 시간</h1>
            <div className={styles.challenge_schedule_time}>
                <div className={styles.challenge_startTime}>
                    <span>시작시간</span>
                    <span className={styles.time}>{challenge.uploadStartTime.slice(0,5)}</span>
                </div>
                <div className={styles.challenge_endTime}>
                    <span>종료시간</span>
                    <span className={styles.time}>{challenge.uploadEndTime.slice(0,5)}</span>
                </div>
            </div>
        </div>
    )
}

export default ChallengeTime