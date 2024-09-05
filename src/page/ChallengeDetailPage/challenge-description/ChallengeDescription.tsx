import styles from './ChallengeDescription.module.scss'

const ChallengeDescription = () => {
    return (
        <div className={styles.challenge_description}>
            <h1>돈을 걸면 무조건 하게 됩니다.</h1>
            <div className={styles.description_text}>
                <span>나를 움직이는 강력한 알람, 돈!<br/>
                    챌린지 시작 전 예치금을 걸어두세요.<br/>
                    <b>85% 이상만 성공해도 예치금을 그대로 돌려받을 수 있어요!</b><br/>
                    혼자만의 결심으로 하기 힘든 일이라면 돈을 걸고 챌린지를 시작해보세요!
                </span>
            </div>
            <h1>챌린지 환급 안내</h1>
            <div className={styles.description_chart}>
                <div className={styles.chart_text}>
                    <div>
                        <span>100% 성공</span>
                        <span>예치금 전액 환급 + 상금</span>
                    </div>
                    <div>
                        <span>85% 이상 성공</span>
                        <span>예치금 전액 환급</span>
                    </div>
                    <div>
                        <span>85% 미만 성공</span>
                        <span>예치금 일부 환급 (성공률 만큼)</span>
                    </div>
                </div>
                <div className={styles.barChart}>
                    <div className={`${styles.bar} ${styles.bar0}`} data-percent="0%">
                        <div className={styles.fill}></div>
                    </div>
                    <div className={`${styles.bar} ${styles.bar40}`} data-percent="">
                        <div className={styles.fill}></div>
                    </div>
                    <div className={`${styles.bar} ${styles.bar60}`} data-percent="">
                        <div className={styles.fill}></div>
                    </div>
                    <div className={`${styles.bar} ${styles.bar80}`} data-percent="">
                        <div className={styles.fill}></div>
                    </div>
                    <div className={`${styles.bar} ${styles.bar100}`} data-percent="85%">
                        <div className={styles.fill}></div>
                    </div>
                    <div className={`${styles.bar} ${styles.bar130}`} data-percent="100%">
                        <div className={styles.fill}></div>
                    </div>
                </div>
                <div className={styles.emptyBox}>
                    <div className={styles.deposit}>
                        <div className={styles.box}></div>
                        <span>예치금</span>
                    </div>
                    <div className={styles.return_deposit}>
                        <div className={styles.box}></div>
                        <span>성공률에 따른 예치금 환급</span>
                    </div>
                    <div className={styles.prizemoney}>
                        <div className={styles.box}></div>
                        <span>상금</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChallengeDescription