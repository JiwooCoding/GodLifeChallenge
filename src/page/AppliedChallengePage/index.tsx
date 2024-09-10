import AppliedList from './appliedChallenge-list/AppliedList'
import styles from './index.module.scss'

const AppliedChallengePage = () => {
    return (
        <div className={styles.challengeList}>
            <h1>참여 챌린지 내역</h1>
            <AppliedList/>
        </div>
    )
}

export default AppliedChallengePage