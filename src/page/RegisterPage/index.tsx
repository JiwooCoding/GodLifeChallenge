import Register from './register/Register'
import { Link } from 'react-router-dom'
import SnsRegister from './snsRegister/SnsRegister'

const RegisterPage = () => {
  return (
    <div className='page'>
      <div className='mb-20'>
        <h1 className='mt-10 mb-10 font-bold text-[20px]'>간편가입</h1>
        <SnsRegister/>
      </div>
      <div>
        <h1 className='mt-10 mb-10 font-bold text-[20px]'>이메일 간편가입</h1>
        <Register/>
      </div>
      <div className='flex text-[13px]'>
          <p className='mr-2'>이미 계정이 있습니까?</p>
          <Link to={'/login'}><p>로그인</p></Link>
      </div>
    </div>
  )
}

export default RegisterPage