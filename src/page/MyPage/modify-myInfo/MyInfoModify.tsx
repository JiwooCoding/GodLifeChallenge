import { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import ProfileImage from '../profile-image/ProfileImage';
import noProfile from '../../../image/girl2.png';
import Modal from '../modal/Modal';
import './MyInfoModify.scss';
import { useUser } from '../../../UserProvider';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../../api/api';

interface ProfileImageUploadData {
    profileImage: FileList;
    nickname: string;
}

const MyInfoModify = () => {
    const { user, setUser } = useUser(); 
    const methods = useForm<ProfileImageUploadData>();
    const [updateProfileMessage, setUpdateProfileMessage] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [nicknameChecked, setNicknameChecked] = useState(false);
    const [nicknameMessage, setNicknameMessage] = useState('');
    const [nicknameExist, setNicknameExist] = useState(false);
    const [nickname, setNickname] = useState('');
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<ProfileImageUploadData> = async (data) => {
        try {
            
            if(!nicknameChecked){
                setNicknameMessage('닉네임 중복확인을 해주세요');
                return;
            }

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


    return (
        <div className='page'>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <div className='modify-myinfo'>
                        <h1>내 정보 수정</h1>
                        {/* 프로필 사진 변경 */}
                        <div className='modify-profile'>
                            <ProfileImage initialProfileImage={user?.profileImage || noProfile} />
                            <input 
                                type="file" 
                                {...methods.register('profileImage')}
                                className='profile-change-input'
                            />
                        </div>

                        {/* 이름, 이메일, 닉네임 */}
                        <div className='modify-input'>
                            <div className='inputbox name-email-input'>
                                <label htmlFor='username'>이름</label>
                                <input 
                                    type='text'
                                    value={user?.name || ''}
                                    readOnly
                                    id='username'
                                    className='readonly-input username'
                                />
                            </div>
                            <div className='inputbox name-email-input'>
                                <label htmlFor='email'>이메일</label>
                                <input 
                                    type='email'
                                    value={user?.email || ''}
                                    readOnly
                                    id='email'
                                    className='readonly-input email'
                                />
                            </div>
                            <div className='inputbox nickname-input'>
                                <label htmlFor="nickname">닉네임</label>
                                <div className='nickname-wrapper'>
                                    <input 
                                        id="nickname" 
                                        className='modify-nickname'
                                        defaultValue={user?.nickname} 
                                        {...methods.register('nickname')}
                                        onChange={(e) => setNickname(e.target.value)}
                                    />
                                    <button 
                                        className='nickname-button'
                                        onClick={checkNickname}
                                    >
                                        중복확인
                                    </button>
                                </div>
                                {nicknameMessage && <p className='nickname-message'>{nicknameMessage}</p>}
                            </div>
                            <div>
                                <button onClick={handleDeleteAccount}>탈퇴하기</button>
                            </div>
                        </div>
                        <div className='saveAndcancleButton'>
                            <button type='submit' className='profile-save-button'>
                                저장
                            </button>
                            <Link to={'/mypage'}><button className='profile-cancle-button'>취소</button></Link>
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
