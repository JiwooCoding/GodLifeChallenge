import styles from './Register.module.scss';
import { useState } from 'react';
import ProfileUpload from '../../RegisterPage/register/profile-upload/ProfileUpload';
import { useForm, FormProvider } from 'react-hook-form';
import noProfile from '../../../image/girl2.png';
import Modal from '../modal/Modal';
import api from '../../../api/api';

const Register = () => {

  const [activeInput, setActiveInput] = useState('');
  const [email, setEmail] = useState('');
  const [emailExist, setEmailExist] = useState(false);
  const [emailMessage, setEmailMessage] = useState('');
  const [emailChecked, setEmailChecked] = useState(false);
  const [nickname, setNickname] = useState('');
  const [nicknameExist, setNicknameExist] = useState(false);
  const [nicknameMessage, setNicknameMessage] = useState('');
  const [nicknameChecked, setNicknameChecked] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordConfirmError, setPasswordConfirmError] = useState('');
  const [userName, setUserName] = useState('');
  const [userNameError, setUserNameError] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const methods = useForm<RegisterFormData>();
  
  const handleFocus = (inputId: string) => {
    setActiveInput(inputId);
  };

  const handleBlur = () => {
    setActiveInput('');
  };

  const checkEmail = async () => {
    setEmailChecked(false);
    try {
      const response = await api.post('/api/check-email', { email });
      if (response.data.email) {
        setEmailExist(true);
        setEmailMessage('이미 존재하는 이메일입니다');
      } else {
        setEmailExist(false);
        setEmailMessage('사용 가능한 이메일입니다');
      }
      setEmailChecked(true);
    } catch (error) {
      console.log(error);
    }
  };
  
  const checkNickname = async () => {
    setNicknameChecked(false);
    try {
      const response = await api.post('/api/check-nickname', { nickname });
      if (response.data.nickname) {
        setNicknameExist(true);
        setNicknameMessage('이미 존재하는 닉네임입니다');
      } else {
        setNicknameExist(false);
        setNicknameMessage('사용 가능한 닉네임입니다');
      }
      setNicknameChecked(true);
    } catch (error) {
      console.log(error);
    }
  };

  const validatePassword = () => {
    if (password.length < 8) {
      setPasswordError('비밀번호는 8자 이상이어야 합니다.');
    } else {
      setPasswordError('');
    }
    if (password !== passwordConfirm) {
      setPasswordConfirmError('비밀번호가 일치하지 않습니다.');
    } else {
      setPasswordConfirmError('');
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    validatePassword();
  };

  const handlePasswordConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirm(e.target.value);
    validatePassword();
  };

  const onSubmit = async (data: RegisterFormData) => {
    if (!emailChecked) {
      setSubmitError('이메일을 확인해주세요');
      return;
    }
    if (!nicknameChecked) {
      setNicknameMessage('닉네임 중복확인을 해주세요');
    }
    if (!email) {
      setEmailMessage('이메일을 입력해주세요');
      return;
    }
    if (!userName) {
      setUserNameError('이름을 입력해주세요');
    }
    if (!password) {
      setPasswordError('비밀번호를 입력해주세요');
    }
    setSubmitError('');
    try {
      const formData = new FormData();
      formData.append('email', email || '');
      formData.append('name', userName || '');
      formData.append('password', password || '');
      formData.append('nickname', nickname || '');

      const profileImage = data.profileImage && data.profileImage.length > 0 ? data.profileImage[0] : noProfile;
      formData.append('profileImage', profileImage);
      
      const response = await api.post('/api/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('회원가입 성공', response.data);
      setModalOpen(true);
    } catch (error) {
      console.log('회원가입 실패', error);
    }
  };

  return (
    <div className={styles.registerForm}>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <ProfileUpload />
          <div className={styles.input_email}>
            <label htmlFor='email'>이메일</label>
            <div>
              <input
                id='email'
                className={`${styles.inputbox} ${activeInput === 'email' ? styles.active : ''}`}
                type='email'
                placeholder='이메일 계정'
                onFocus={() => handleFocus('email')}
                onBlur={handleBlur}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button className={styles.confirm_button} type='button' onClick={checkEmail}>
                확인하기
              </button>
            </div>
            {emailMessage && <div>{emailMessage}</div>}
          </div>
          <div className={styles.input}>
            <label htmlFor="username">이름</label>
            <input
              id="username"
              className={`${styles.inputbox} ${activeInput === 'username' ? styles.active : ''}`}
              type="text"
              placeholder="이름 입력"
              onFocus={() => handleFocus('username')}
              onBlur={handleBlur}
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          {userNameError && <div>{userNameError}</div>}
          <div className={styles.input_nickname}>
            <label htmlFor='nickname'>닉네임</label>
            <div>
              <input
                id='nickname'
                className={`${styles.inputbox} ${activeInput === 'nickname' ? styles.active : ''}`}
                type='text'
                placeholder='닉네임 입력'
                onFocus={() => handleFocus('nickname')}
                onBlur={handleBlur}
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
              <button className={styles.confirm_button} type='button' onClick={checkNickname}>
                중복확인
              </button>
            </div>
            {nicknameMessage && <div>{nicknameMessage}</div>}
          </div>
          <div className={styles.input}>
            <label htmlFor="password">비밀번호</label>
            <input
              id="password"
              className={`${styles.inputbox} ${activeInput === 'password' ? styles.active : ''}`}
              type="password"
              placeholder="비밀번호 입력"
              onFocus={() => handleFocus('password')}
              onBlur={handleBlur}
              value={password}
              onChange={handlePasswordChange}
            />
            {passwordError && <div className={styles.password_error_msg}>{passwordError}</div>}
            <input
              id={styles.passwordConfirm}
              className={`${styles.inputbox} ${activeInput === 'passwordConfirm' ? styles.active : ''}`}
              type="password"
              placeholder="비밀번호 확인"
              onFocus={() => handleFocus('passwordConfirm')}
              onBlur={handleBlur}
              value={passwordConfirm}
              onChange={handlePasswordConfirmChange}
            />
            {passwordConfirmError && <div className={styles.password_error_msg}>{passwordConfirmError}</div>}
          </div>
          <button className={styles.register_button} type='submit'>회원가입 완료하기</button>
        </form>
      </FormProvider>
      {modalOpen && <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} />}
    </div>
  );
};

export default Register;
