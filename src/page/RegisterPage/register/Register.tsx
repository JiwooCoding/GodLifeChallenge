import styles from './Register.module.scss';
import { useRef, useState } from 'react';
import ProfileUpload from '../../RegisterPage/register/profile-upload/ProfileUpload';
import { useForm, FormProvider } from 'react-hook-form';
import noProfile from '../../../image/girl2.png';
import api from '../../../api/api';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/button/Button';
import Modal from '../../../components/modal';
import { useModal } from '../../../contexts/ModalProvider';
import useActiveInput from '../../../hooks/useActiveInput';

const Register = () => {

  const navigate = useNavigate();

  const [emailChecked, setEmailChecked] = useState(false);
  const [nickNameChecked, setNickNameChecked] = useState(false);
  const [emailMessage, setEmailMessage] = useState<string | null>(null); 
  const [nicknameMessage, setNicknameMessage] = useState<string | null>(null);

  const methods = useForm<RegisterFormData>();
  const {handleSubmit, register, watch, getValues, setError, clearErrors, formState:{errors}} = methods;

  const {isOpen, closeModal, openModal } = useModal();
  const {activeInput, handleFocus, handleBlur} = useActiveInput();

  const passwordRef = useRef<string | undefined>(undefined);
  passwordRef.current = watch('password');

  const registerComplete = () => {
    navigate('/login');
    closeModal();
  }

  const checkedEmail = async() => {
    const email= getValues('email');
    try {
      const response = await api.post<{email:boolean}>('/api/check-email', {email});
      if(response.data.email){
        setError('email', {type:'manual',message:'이미 존재하는 이메일입니다'});
        setEmailChecked(false);
        setEmailMessage(null);
      }else{
        clearErrors('email');
        setEmailChecked(true);
        setEmailMessage('사용 가능한 이메일입니다')
      }
    } catch (error) {
      console.log('이메일 중복 확인 오류!!!!!', error);
    }
  }

  const checkedNickname = async() => {
    const nickname= getValues('nickname');
    try {
      const response = await api.post<{nickname:boolean}>('/api/check-nickname', {nickname});
      if(response.data.nickname){
        setError('nickname', {type:'manual',message:'이미 존재하는 닉네임입니다'});
        setNickNameChecked(false);
        setNicknameMessage(null);
      }else{
        clearErrors('email');
        setNickNameChecked(true);
        setNicknameMessage('사용 가능한 이메일입니다');
      }
    } catch (error) {
      console.log('이메일 중복 확인 오류!!!!!', error);
    }
  }
  
  
  //제출
  const onSubmit = async (data: RegisterFormData) => {
    if(!emailChecked){
      alert('이메일을 확인해주세요');
      return;
    }
    
    if (!nickNameChecked) {
      alert('닉네임 중복 확인을 해주세요');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('email', data.email || '');
      formData.append('name', data.userName || '');
      formData.append('password', data.password || '');
      formData.append('nickname', data.nickname || '');

      const profileImage = data.profileImage && data.profileImage.length > 0 ? data.profileImage[0] : noProfile;
      formData.append('profileImage', profileImage);
      
      const response = await api.post('/api/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('회원가입 성공', response.data);
      openModal();

    } catch (error) {
      console.log('회원가입 실패', error);
    }
  };


  return (
    <>
    <div className={styles.registerForm}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ProfileUpload />
            
          {/* 이메일 */}
          <div className={styles.input_email}>
            <label htmlFor='email'>이메일</label>
            <div>
              <input
                {...register('email',{
                  required:{value:true, message:'이메일을 입력해주세요'},
                  pattern:{
                    value:/^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i,
                    message:'이메일 형식이 올바르지 않습니다'
                  },
                })}
                id='email'
                className={`${styles.inputbox} ${activeInput === 'email' ? styles.active : ''}`}
                type='email'
                placeholder='이메일 계정'
                onFocus={() => handleFocus('email')}
                onBlur={handleBlur}
              />
              <Button variant='check' type='button' onclick={checkedEmail}>
                확인하기
              </Button>
            </div>
            {/* 에러 메시지 */}
            {errors?.email && <div className={styles.error_msg}>{errors.email.message}</div>}
            {/* 성공 메시지 */}
            {!errors?.email && emailMessage && <div className={styles.success_msg}>{emailMessage}</div>}
          </div>

          {/* 이름 */}
          <div className={styles.input}>
            <label htmlFor="username">이름</label>
            <input
              {...register('userName', {
                required:{value:true, message:'이름을 입력해주세요'}
              })}
              id="username"
              className={`${styles.inputbox} ${activeInput === 'username' ? styles.active : ''}`}
              type="text"
              placeholder="이름 입력"
              onFocus={() => handleFocus('username')}
              onBlur={handleBlur}
            />
            {errors?.userName && <div className={styles.error_msg}>{errors?.userName?.message}</div>}
          </div>

          {/* 닉네임 */}
          <div className={styles.input_nickname}>
            <label htmlFor='nickname'>닉네임</label>
            <div>
              <input
                {...register('nickname',{
                  required:{value:true, message:'닉네임을 입력해주세요'}
                })}
                id='nickname'
                className={`${styles.inputbox} ${activeInput === 'nickname' ? styles.active : ''}`}
                type='text'
                placeholder='닉네임 입력'
                onFocus={() => handleFocus('nickname')}
                onBlur={handleBlur}
              />
              <Button variant='check' type='button' onclick={checkedNickname}>
                중복확인
              </Button>
            </div>
            {/* 오류 메시지 */}
            {errors?.nickname && <div className={styles.error_msg}>{errors?.nickname?.message}</div>}
            {/* 성공 메시지 */}
            {!errors?.nickname && nicknameMessage && <div className={styles.success_msg}>{nicknameMessage}</div>}
          </div>

          {/* 비밀번호 */}
          <div className={styles.input}>
            <label htmlFor="password">비밀번호</label>
            <input
              id="password"
              {...register('password',{
                required:{value:true, message:"비밀번호를 입력해주세요"},
                minLength:{
                  value:6,
                  message:"비밀번호는 6자리 이상입니다"
                },
              })}
              className={`${styles.inputbox} ${activeInput === 'password' ? styles.active : ''}`}
              type="password"
              placeholder="비밀번호 (6자 이상)"
              onFocus={() => handleFocus('password')}
              onBlur={handleBlur}
            />
            {errors?.password && <div className={styles.error_msg}>{errors?.password.message}</div>}
            
            {/* 비밀번호 확인 */}
            <input
              id={styles.passwordConfirm}
              {...register('passwordConfirm',{
                required:{value:true, message:'비밀번호 확인을 입력해주세요'},
                validate:(value) => value === passwordRef.current,
              })}
              className={`${styles.inputbox} ${activeInput === 'passwordConfirm' ? styles.active : ''}`}
              type="password"
              placeholder="비밀번호 확인"
              onFocus={() => handleFocus('passwordConfirm')}
              onBlur={handleBlur}
            />
            {errors?.passwordConfirm?.type === 'required' && (
              <div className={styles.error_msg}>{errors?.passwordConfirm?.message}</div>
            )}
            {errors?.passwordConfirm?.type === 'validate' && (
              <div className={styles.error_msg}>비밀번호가 일치하지 않습니다</div>
            )}
          </div>

          {/* 제출 버튼 */}
          <Button variant='main' type='submit'>회원가입 완료하기</Button>
        
        </form>
      </FormProvider>
    </div>
    {isOpen && (
      <Modal isOpen={isOpen} onClose={closeModal}>
      <Modal.Header>
        회원가입 완료
      </Modal.Header>
      <Modal.Title>
        🎉회원가입을 축하드립니다!🥳
      </Modal.Title>
      <Modal.Footer>
        <Modal.Button buttonStyle='button--primary' onClick={registerComplete}>확인</Modal.Button>
      </Modal.Footer>
    </Modal>
    )}
    </>
  );
};

export default Register;
