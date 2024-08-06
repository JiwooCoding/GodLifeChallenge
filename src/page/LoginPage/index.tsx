import SnsSignIn from './sign-in-sns/SnsSignIn'
import SignIn from './sign-in/SignIn'
import { Link } from 'react-router-dom'

const LoginPage = () => {
  return (
    <div className='page'>
      <h1 className='font-bold text-[30px] mt-[100px]'>로그인</h1>
      <SignIn/>
      <SnsSignIn/>
      <div className='flex justify-center gap-2 text-[14px] mt-8'>
        <p>아직 계정이 없나요?</p>
        <p className='text-orange-600 underline' ><Link to={"/register"}>가입하기</Link></p>
      </div>
    </div>
  )
}

export default LoginPage