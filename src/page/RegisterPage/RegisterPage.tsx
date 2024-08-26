import Register from './register/Register'
import { Link } from 'react-router-dom'
import styles from './RegisterPage.module.scss'
import SnsRegister from './snsRegister/SnsRegister'

const RegisterPage = () => {
  return (
    <div className='page'>
      <div className={styles.sns_register}>
        <h1>간편가입</h1>
        <SnsRegister/>
      </div>
      <div>
        <h1 className={styles.email_register}>이메일 간편가입</h1>
        <Register/>
      </div>
      <div className={styles.already_have_account}>
          <p>이미 계정이 있습니까?</p>
          <Link to={'/login'}><p>로그인</p></Link>
      </div>
    </div>
  )
}

export default RegisterPage