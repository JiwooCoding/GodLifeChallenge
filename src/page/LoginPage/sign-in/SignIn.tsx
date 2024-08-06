import React, { useState } from 'react'
import styles from './SignIn.module.scss'
import { useNavigate } from 'react-router-dom';
import api from '../../../api/api'

const SignIn = () => {

  const [activeInput, setActiveInput]= useState('');
  const [passwordError, setPasswordError] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [loginError, setLoginError] = useState('');

  const navigate= useNavigate();

  const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
  
  const emailCheck = (email:string) => {
    if(!emailRegEx.test(email)){
      setEmailError('이메일 형식이 올바르지 않습니다');
      return false;
    }
    return true;
  }

  const handleFocus = (inputId:string) => {
    setActiveInput(inputId);
  }

  const handleBlur = () => {
    setActiveInput('');
  }

  const validatePassword = () => {
    if(password.length < 8){
      setPasswordError('비밀번호는 8자 이상입니다')
    }else{
      setPasswordError('');
    }
  }



  const handlePasswordChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    validatePassword();
  }

  const handleEmailChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }

  const handleSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(!emailCheck(email)){
      return;
    }

    if(!email){
      setEmailError('이메일을 입력하세요');
      return;
    }else if(!password){
      setPasswordError('비밀번호를 입력하세요');
      return;
    }

    try {
      const response = await api.post('/api/login',{
        email,
        password
      });

      const {accessToken, refreshToken, user} = response.data;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      //유저 정보를 로컬에 저장 => 마이페이지에서 가져와 사용
      localStorage.setItem('user', JSON.stringify(user));
      
      navigate('/homepage');
    } catch (error) {
      console.log('로그인 에러',error)
      setLoginError('로그인에 실패했습니다. 다시 시도해주세요.')
    }
  };


  return (
    <div>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <input 
        type='text' 
        placeholder='아이디(이메일) 입력'
        className={`${activeInput === 'id' ? 'active' : ''}`}
        onFocus={() => handleFocus('id')}
        onBlur={handleBlur}
        onChange={handleEmailChange}
        value={email}
        />
        {emailError && (
          <div className='email-error-msg'>{emailError}</div>
        )}
        <input 
        type='password' 
        placeholder='비밀번호 입력'
        className={`${activeInput === 'password' ? 'active' : ''}`}
        onFocus={() => handleFocus('password')}
        onBlur={handleBlur}
        value={password}
        onChange={handlePasswordChange}
        />
        {passwordError && (
          <div className='password-error-msg'>{passwordError}</div>
        )}
        {loginError && (
          <div className='login-error-msg'>{loginError}</div>
        )}
        <button type='submit'>로그인하기</button>
      </form>
    </div>
  )
}

export default SignIn