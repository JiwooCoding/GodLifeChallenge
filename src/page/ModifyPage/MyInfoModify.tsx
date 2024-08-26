import { useEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import ProfileImage from './profileImage-modify/ProfileImage';
import noProfile from '../../image/girl2.png';
import styles from './MyInfoModify.module.scss';
import { useUser } from '../../contexts/UserProvider';
import api from '../../api/api';
import NicknameModify from './nickname-modify/NicknameModify';
import Buttons from './buttons/Buttons';

interface ProfileImageUploadData {
    profileImage?: FileList;
    nickname?: string;
}

const MyInfoModify = () => {
    const { user, setUser } = useUser();

    const methods = useForm<ProfileImageUploadData>({
        defaultValues: {
            nickname: user?.nickname || '',
        }
    });

    const { handleSubmit, register, reset } = methods;

    const [loading, setLoading] = useState(true);
    const [nicknameChecked, setNicknameChecked] = useState(false);

    useEffect(() => {
        if (user) {
            reset({
                nickname: user.nickname,
            });
            setLoading(false);
        }
    }, [user, reset]);

    const onSubmit: SubmitHandler<ProfileImageUploadData> = async (data) => {
        const isNicknameChanged = data.nickname !== user?.nickname;
    
        if (isNicknameChanged && !nicknameChecked) {
            alert('닉네임 중복 체크를 해주세요');
            return;
        }
    
        try {
            const formData = new FormData();
            formData.append('nickname', data.nickname!);
    
            if (data.profileImage && data.profileImage.length > 0) {
                formData.append('profileImage', data.profileImage[0]);
            }
    
            console.log('FormData Content:', formData.get('nickname'), formData.get('profileImage'));
    
            const response = await api.post<User>('/api/user/update', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            // prevUser가 null이 아닌지 확인하고, 모든 필드를 안전하게 반환
            setUser(prevUser => {
                if (!prevUser) return prevUser; // prevUser가 null인 경우 아무것도 반환하지 않음
    
                return {
                    ...prevUser,
                    profileImage: response.data.profileImage || prevUser.profileImage,
                    nickname: response.data.nickname || prevUser.nickname,
                };
            });
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
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.modify_myinfo}>
                        <h1>내 정보 수정</h1>
                        <div className={styles.modify_profile}>
                            <ProfileImage initialProfileImage={user?.profileImage || noProfile} />
                            <input
                                type="file"
                                {...register('profileImage')}
                                className={styles.profile_change_input}
                            />
                        </div>
                        <div className={styles.modify_input}>
                            <div className={`${styles.inputbox} ${styles.name_email_input}`}>
                                <label htmlFor='username'>이름</label>
                                <input
                                    value={user?.name || ''}
                                    readOnly
                                    className={styles.readonly_input}
                                />
                            </div>
                            <div className={`${styles.inputbox} ${styles.name_email_input}`}>
                                <label htmlFor='email'>이메일</label>
                                <input
                                    value={user?.email || '정보가 없습니다'}
                                    readOnly
                                    className={styles.readonly_input}
                                />
                            </div>
                            <NicknameModify
                                methods={methods}
                                setNicknameChecked={setNicknameChecked}
                            />
                        </div>
                        <Buttons />
                    </div>
                </form>
            </FormProvider>
        </div>
    );
};

export default MyInfoModify;
