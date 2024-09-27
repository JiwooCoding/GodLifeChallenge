import Register from './register/Register'
import { Link } from 'react-router-dom'
import mainImage from '../../image/login&register/러닝 크루 모여라.png'
import styles from './RegisterPage.module.scss'

const RegisterPage = () => {
  return (
    <div className={styles.register_container}>
      <div className={styles.register}>
          <div className={styles.register_text}>
            <img src={mainImage}/>
          </div>
          <div className={styles.register_form}>
            <div>
              <Register/>
            </div>
            <div className={styles.already_have_account}>
              <span>이미 계정이 있습니까?</span>
              <Link to={'/login'}><p>로그인</p></Link>
            </div>
          </div>
      </div>
    </div>
  )
}

export default RegisterPage