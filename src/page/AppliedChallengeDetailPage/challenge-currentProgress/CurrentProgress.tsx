import { UserChallengeRecord } from '../../../type/challengeData';
import { IUserAuth } from '../../../type/IUserAuth';
import styles from './CurrentProgress.module.scss'


type CurrentSiturationProps = {
    challenge:IUserAuth | UserChallengeRecord;
}

const CurrentProgress = ({challenge}:CurrentSiturationProps) => {
    return (
        <div className={styles.myAuth}>
            <h1>나의 인증 현황</h1>
            <div>
                <div className={styles.myAuth_state}>
                    <div className={styles.progress}>
                        <span>달성률</span>
                        <span>{challenge.progress}%</span>
                    </div>
                    <div className={styles.deposit}>
                        <span>예치금</span>
                        
                    </div>
                </div>
                <div className={styles.progressBar}>
                    <div
                        className={styles.progressFill}
                        style={{ width: `${challenge.progress}%` }} ></div>
                </div>
            </div>
        </div>
    )
}

export default CurrentProgress