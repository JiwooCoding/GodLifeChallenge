import ChallengeUpload from './challenge-upload/ChallengeUpload'
import styles from './ChallengePage.module.scss'

const ChallengePage = () => {
    return (
        <div className='page'>
            <h1 className={styles.title}>챌린지를 자유롭게 만들어주세요!😆</h1>
            <h2 className={styles.subTitle}><span>*</span> 별 표시 항목은 필수 입력값입니다.</h2>
            <ChallengeUpload/>
        </div>
    )
}

export default ChallengePage