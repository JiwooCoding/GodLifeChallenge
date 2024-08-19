import { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import ProfileImage from '../profile-image/ProfileImage';
import noProfile from '../../../image/girl2.png';
import Modal from '../modal/Modal';
import styles from './MyInfoModify.module.scss';
import { useUser } from '../../../UserProvider';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../../api/api';

interface ProfileImageUploadData {
    profileImage: FileList;
    nickname: string;
}

const MyInfoModify = () => {
    const { user, setUser } = useUser(); 
    const methods = useForm<ProfileImageUploadData>({
        defaultValues: {
            nickname: user?.nickname || ''
        }
    });

    const [updateProfileMessage, setUpdateProfileMessage] = useState('');
    const [nicknameMessage, setNicknameMessage] = useState('');
    const [modalOpen, setModalOpen] = useState(false);

    const navigate = useNavigate();

    //닉네임 체크
    const checkNickname = async () => {
        const nickname = methods.getValues('nickname');
        methods.clearErrors('nickname');

        try {
            const response = await api.post('/api/check-nickname', { nickname });
            if (response.data.nickname) {
                methods.setError('nickname',{
                    type:'manual',
                    message:'이미 존재하는 닉네임입니다'
                });
                setNicknameMessage('이미 존재하는 메시지입니다');
            } else {
                setNicknameMessage('사용 가능한 닉네임입니다');
            }
        } catch (error) {
            console.log('닉네임 중복 오류',error);
        }
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };

    //탈퇴하기
    const handleDeleteAccount = async() => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            await api.delete('/api/deleteToken', {
                headers:{
                    Authorization:`Bearer ${accessToken}`
                }
            });
            localStorage.removeItem('accessToken');
            setUser(null);
            navigate('/')
        } catch (error) {
            console.log('유저 탈퇴 실패',error)
        }
    }

    //폼 제출
    const onSubmit: SubmitHandler<ProfileImageUploadData> = async (data) => {
        
        if(methods.formState.errors.nickname){
            return;
        }
        
        try {
            const accessToken = localStorage.getItem('accessToken');
            const formData = new FormData();
            if (data.profileImage && data.profileImage.length > 0) {
                formData.append('profileImage', data.profileImage[0]);
            }
            formData.append('nickname', data.nickname);

            const response = await api.post<User>('/api/updateProfile', formData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            // 사용자 정보 업데이트
            setUser(prevUser => ({
                ...prevUser!,
                profileImage: response.data.profileImage,
                nickname: response.data.nickname
            }));
            setUpdateProfileMessage('프로필 정보가 업데이트되었습니다');
            setModalOpen(true);
        } catch (error) {
            console.error('프로필 정보 업데이트 실패', error);
            setUpdateProfileMessage('프로필 정보 업데이트에 실패했습니다');
        }
    };


    return (
        <div className='page'>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <div className={styles.modify_myinfo}>
                        <h1>내 정보 수정</h1>
                        {/* 프로필 사진 변경 */}
                        <div className={styles.modify_profile}>
                            <ProfileImage initialProfileImage={user?.profileImage || noProfile} />
                            <input 
                                type="file" 
                                {...methods.register('profileImage')}
                                className={styles.profile_change_input}
                            />
                        </div>

                        {/* 이름, 이메일, 닉네임 */}
                        <div className={styles.modify_input}>
                            <div className={`${styles.inputbox} ${styles.name_email_input}`}>
                                <label htmlFor='username'>이름</label>
                                <input 
                                    type='text'
                                    value={user?.name || ''}
                                    readOnly
                                    id='username'
                                    className={styles.readonly_input}
                                />
                            </div>
                            <div className={`${styles.inputbox} ${styles.name_email_input}`}>
                                <label htmlFor='email'>이메일</label>
                                <input 
                                    type='email'
                                    value={user?.email || '정보가 없습니다'}
                                    readOnly
                                    id='email'
                                    className={styles.readonly_input}
                                />
                            </div>
                            <div className={`${styles.inputbox} ${styles.nickname_input}`}>
                                <label htmlFor="nickname">닉네임</label>
                                <div className={styles.nickname_wrapper}>
                                    <input 
                                        id="nickname" 
                                        className={styles.modify_nickname}
                                        defaultValue={user?.nickname} 
                                        {...methods.register('nickname',{
                                            required:'닉네임을 입력하세요',
                                            onChange: (e) => {
                                                methods.setValue('nickname', e.target.value);
                                            }
                                        })}
                                    />
                                    <button 
                                        className={styles.nickname_button}
                                        onClick={checkNickname}
                                        type='button'
                                    >
                                        중복확인
                                    </button>
                                </div>
                                {nicknameMessage && <p className={styles.nickname_message}>{nicknameMessage}</p>}
                                {methods.formState.errors.nickname && <p className={styles.nickname_message}>{methods.formState.errors.nickname.message}</p>}
                            </div>
                        </div>
                        <div className={styles.saveAndcancleButton}>
                            <div className={styles.delete_account}>
                                <button type='button' className={styles.account_delete_button} onClick={handleDeleteAccount}>탈퇴하기</button>
                            </div>
                            <div className={styles.modify_account}>
                                <button type='submit' className={styles.profile_save_button}>저장</button>
                                <Link to={'/mypage'}>
                                    <button type='button' className={styles.profile_cancle_button}>취소</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </form>
            </FormProvider>
            {modalOpen && (
                <Modal 
                    completeMessage={updateProfileMessage} 
                    onClose={handleModalClose}
                />
            )}
        </div>
    );
};

export default MyInfoModify;
