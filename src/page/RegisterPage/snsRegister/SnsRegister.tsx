import styles from './SnsRegister.module.scss'
import kakao from '../../../image/kakao.png'
import naver from '../../../image/naver.png'

const SnsRegister = () => {
    return (
    <div className='page'>
        <div className={styles.snsRegister}>
            <div className={styles.kakao}>
                <img src={kakao} alt='kakao' style={{width:'25px'}}/>
                <p className=''>카카오로 시작하기</p>
            </div>
            <div className={styles.naver}>
                <img src={naver} alt='naver' style={{width:'25px'}}/>
                <p>네이버로 시작하기</p>
            </div>
        </div>
        <div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
    )
}

export default SnsRegister