import { useEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import ProfileImage from '../profile-image/ProfileImage';
import noProfile from '../../../image/girl2.png';
import Modal from '../modal/Modal';
import styles from './MyInfoModify.module.scss';
import { useUser } from '../../../contexts/UserProvider';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../../api/api';
import Button from '../../../components/button/Button';

interface ProfileImageUploadData {
    profileImage: FileList;
    nickname: string;
}

const MyInfoModify = () => {
    const { user, setUser } = useUser(); 
    const methods = useForm<ProfileImageUploadData>({
        defaultValues: {
            nickname: user?.nickname || '',
        }
    });

    const [updateProfileMessage, setUpdateProfileMessage] = useState('');
    const [nicknameMessage, setNicknameMessage] = useState<string | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(true); 
    const [nicknameChecked, setNicknameChecked] = useState(false); // 닉네임 중복 체크 여부 상태

    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            methods.reset({
                nickname: user.nickname,
            });
            setLoading(false);
        }
    }, [user, methods]);

    const checkNickname = async () => {
        const nickname = methods.getValues('nickname');
        methods.clearErrors('nickname');

        try {
            const response = await api.post('/api/check-nickname', { nickname });
            if (response.data.nickname) {
                methods.setError('nickname', {
                    type: 'manual',
                    message: '이미 존재하는 닉네임입니다',
                });
                setNicknameMessage(null);
            } else {
                setNicknameMessage('사용 가능한 닉네임입니다');
                setNicknameChecked(true); // 닉네임 중복 체크 완료 상태로 설정
            }
        } catch (error) {
            console.log('닉네임 중복 오류', error);
        }
    };

    const handleModalClose = () => {
        setModalOpen(false);
        window.location.replace('/mypage');
    };

    const handleDeleteAccount = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                console.error('엑세스 토큰 없음');
                return;
            }
    
            await api.delete('/api/deleteToken', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
    
            localStorage.removeItem('accessToken');
            setUser(null);
            navigate('/');
    
        } catch (error) {
            console.error('유저 탈퇴 실패', error);
        }
    };

    const onSubmit: SubmitHandler<ProfileImageUploadData> = async (data) => {
        if (!nicknameChecked) { 
            alert('닉네임 중복 체크를 해주세요');
            return; 
        }

        if (methods.formState.errors.nickname) {
            return;
        }

        try {
            const formData = new FormData();
            if (data.profileImage && data.profileImage.length > 0) {
                formData.append('profileImage', data.profileImage[0]);
            }
            formData.append('nickname', data.nickname);

            const response = await api.post<User>('/api/user/update', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setUser(prevUser => ({
                ...prevUser!,
                profileImage: response.data.profileImage,
                nickname: response.data.nickname,
            }));
            setUpdateProfileMessage('프로필 정보가 업데이트되었습니다');
            setModalOpen(true);
        } catch (error) {
            console.error('프로필 정보 업데이트 실패', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='page'>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <div className={styles.modify_myinfo}>
                        <h1>내 정보 수정</h1>
                        <div className={styles.modify_profile}>
                            <ProfileImage initialProfileImage={user?.profileImage || noProfile} />
                            <input 
                                type="file" 
                                {...methods.register('profileImage')}
                                className={styles.profile_change_input}
                            />
                        </div>

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
                                        {...methods.register('nickname', {
                                            required: '닉네임을 입력하세요',
                                            onChange: (e) => {
                                                methods.setValue('nickname', e.target.value);
                                                setNicknameChecked(false); // 닉네임 변경 시 중복 체크 상태 리셋
                                            },
                                        })}
                                    />
                                    <Button 
                                        variant='check'
                                        onclick={checkNickname}
                                        type='button'
                                    >
                                        중복확인
                                    </Button>
                                </div>
                                {nicknameMessage && <p className={styles.nickname_success_message}>{nicknameMessage}</p>}
                                {methods.formState.errors.nickname && <p className={styles.nickname_error_message}>{methods.formState.errors.nickname.message}</p>}
                            </div>
                        </div>
                        <div className={styles.saveAndcancleButton}>
                            <div className={styles.delete_account}>
                                <button type='button' className={styles.account_delete_button} onClick={handleDeleteAccount}>탈퇴하기</button>
                            </div>
                            <div className={styles.modify_account}>
                                <Button type='submit' variant='confirm'>저장</Button>
                                <Link to={'/mypage'}>
                                    <Button type='button' variant='close'>취소</Button>
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
