import { useState } from 'react'
import styles from './SignIn.module.scss'
import api from '../../../api/api'
import { useForm } from 'react-hook-form';
import Button from '../../../components/button/Button';

const SignIn = () => {

  const {register, handleSubmit, formState:{errors}, setError} = useForm<LoginFormData>();

  const [activeInput, setActiveInput]= useState('');

  const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;

  const onSubmit = async(data:LoginFormData) => {
    try {
      const response = await api.post('/api/login',{
        email:data.email,
        password:data.password
      });

      const {accessToken, refreshToken, userId} = response.data;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('userId', userId);

      window.location.replace("/");
    } catch (error) {
      console.log('로그인 에러', error);
      setError('root', {type:'manual', message:'로그인에 실패했습니다. 다시 시도해주세요.'})
    }
  }

  const handleFocus = (inputId:string) => {
    setActiveInput(inputId);
  }

  const handleBlur = () => {
    setActiveInput('');
  }



  return (
    <div>
      <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
        <input 
          {...register('email', {
            required:{value:true, message:'아이디(이메일)를 입력해주세요'},
            pattern:{
              value:emailRegEx,
              message:'이메일 형식이 올바르지 않습니다'
            },
          })}
          type='text' 
          placeholder='아이디(이메일) 입력'
          className={`${activeInput === 'id' ? 'active' : ''}`}
          onFocus={() => handleFocus('id')}
          onBlur={handleBlur}
        />
        {errors.email && (<div className={styles.email_error_msg}>{errors.email.message}</div>)}
        <input 
          {...register('password',{
            required:'비밀번호를 입력하세요',
            minLength:{
              value:6,
              message:'비밀번호는 6자 이상입니다'
            }
          })}
          type='password' 
          placeholder='비밀번호 입력'
          className={`${activeInput === 'password' ? 'active' : ''}`}
          onFocus={() => handleFocus('password')}
          onBlur={handleBlur}
        />
        {errors.password && (<div className={styles.password_error_msg}>{errors.password.message}</div>)}

        {/* 로그인 에러 메시지 */}
        {errors.root && <div className={styles.login_error_msg}>{errors.root.message}</div>}
        
        <Button type='submit' variant='main'>로그인하기</Button>
      </form>
    </div>
  )
}

export default SignIn