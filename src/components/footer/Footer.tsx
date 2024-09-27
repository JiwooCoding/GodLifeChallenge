import KakoAPI from '../KakaoAPI'
import styles from './Footer.module.scss'

const Footer = () => {
  return (
    <footer>
      <div className={styles.footer_info}>
        <p className={styles.company_name}>포인트스마일(주)</p>
        <div className={styles.company_info}>
          <p>서울특별시 서초구 반포대로20길 29</p>
          <p>02-000-000</p>
          <p>ekdlslove000@gmail.com</p>
        </div>
        <p className={styles.Copyright}>Copyright(C)PointSmile. All right reserved.</p>
      </div>
      <div className={styles.company_location}>
        <KakoAPI/>
      </div>
    </footer>
  )
}

export default Footer