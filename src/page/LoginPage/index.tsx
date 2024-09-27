import SnsSignIn from './sign-in-sns/SnsSignIn'
import SignIn from './sign-in/SignIn'
import { Link } from 'react-router-dom'
import mainImage from '../../image/login&register/러닝 크루 모여라.png'
import styles from './LoginPage.module.scss'

const LoginPage = () => {
  return (
    <div className={styles.login_container}>
      <div className={styles.login}>
        <div className={styles.login_text}>
          {/* <h1 className='font-bold text-[30px] mt-[100px]'>로그인</h1> */}
          <img src={mainImage}/>
        </div>
        <div className={styles.login_form}>
          <h1 className={styles.login_form_text}>로그인</h1>
          <SnsSignIn/>
          <SignIn/>
          <div className={styles.nouser_yet}>
            <p>아직 계정이 없나요?</p>
            <p className={styles.goto_register} ><Link to={"/register"}>가입하기</Link></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage