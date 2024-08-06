import styles from './SnsSignIn.module.scss';
import kakao from '../../../image/kakao.png';
import naver from '../../../image/naver.png';

const SnsSignIn = () => {
  return (
    <div>
        <div className={styles.snsLogin}>
            <div className={styles.kakao}>
                <img src={kakao} alt='kakao'/>
                <p>카카오로 시작하기</p>
            </div>
            <div className={styles.naver}>
                <img src={naver} alt='naver'/>
                <p>네이버로 시작하기</p>
            </div>
        </div>
    </div>
  )
}

export default SnsSignIn;
