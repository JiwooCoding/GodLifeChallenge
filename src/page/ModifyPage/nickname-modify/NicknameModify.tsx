import React, { useState } from 'react'
import { UseFormReturn } from 'react-hook-form';
import styles from '../MyInfoModify.module.scss'
import api from '../../../api/api';
import { useUser } from '../../../contexts/UserProvider';
import Button from '../../../components/button/Button';

interface ProfileImageUploadData {
    profileImage?: FileList;
    nickname?: string;
}

interface NicknameModifyProps {
    methods:UseFormReturn<ProfileImageUploadData>;
    setNicknameChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

const NicknameModify = ({methods,setNicknameChecked}:NicknameModifyProps) => {

    const {user} = useUser();
    const {getValues, setError, register, setValue} = methods;
    const [nicknameMessage, setNicknameMessage] = useState<string | null>(null);
    

    const checkNickname = async () => {
        const nickname = getValues('nickname');
        methods.clearErrors('nickname');

        try {
            const response = await api.post('/api/check-nickname', { nickname });
            if (response.data.nickname) {
                setError('nickname', {
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

    return (
        <div className={`${styles.inputbox} ${styles.nickname_input}`}>
            <label htmlFor="nickname">닉네임</label>
            <div className={styles.nickname_wrapper}>
                <input 
                    id="nickname" 
                    className={styles.modify_nickname}
                    defaultValue={user?.nickname} 
                    {...register('nickname', {
                        required: '닉네임을 입력하세요',
                        onChange: (e) => {
                            setValue('nickname', e.target.value);
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
    )
}

export default NicknameModify