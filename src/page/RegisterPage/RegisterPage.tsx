import Register from './register/Register'
import { Link } from 'react-router-dom'
import styles from './RegisterPage.module.scss'

const RegisterPage = () => {
  return (
    <div className='register-container'>
      <div className='register'>
          <div className='register-text'>
            <h1 className={styles.email_register}>이메일 간편가입</h1>
          </div>
          <div className='register-form'>
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