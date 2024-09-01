import styles from './SnsSignIn.module.scss';
import kakao from '../../../image/kakao.png';
import SocialKakao from './SocialKakao';

const SnsSignIn = () => {
  return (
    <div>
        <div className={styles.snsLogin}>
            <div className={styles.kakao}>
              <img src={kakao} alt='kakao'/>
              <SocialKakao/>
            </div>
            <div className={styles.or_menu}>
              <div className={styles.horizontal_line}></div>
              <div className={styles.or_text}><span>또는</span></div>
              <div className={styles.horizontal_line}></div>
            </div>
        </div>
    </div>
  )
}

export default SnsSignIn;
