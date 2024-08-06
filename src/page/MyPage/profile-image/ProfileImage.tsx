import { useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form';
import noProfile from '../../../image/girl2.png'
import upload from '../../../image/upload-photo.png';

interface ProfileImageProps{
    initialProfileImage:string;
}

const ProfileImage = ({initialProfileImage}:ProfileImageProps) => {
    const [profileImage, setProfileImage] = useState<string>(initialProfileImage); // || noProfileImage 변경
    const { control, setValue } = useFormContext();

    const handlePhotoChange = (files: FileList | null) => {
        if (files && files.length > 0) {
            const file = files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
            setProfileImage(reader.result as string);
            };
            reader.readAsDataURL(file);
            setValue("profileImage", files); // 폼 필드 값 업데이트
        } else {
            setProfileImage(noProfile);
            setValue("profileImage", null); // 폼 필드 값 업데이트
        }
    };

    return (
    <div className='profile-upload'>
        <img src={profileImage} alt='Profile' className='profile-image' />
        <label htmlFor='file'>
        <img src={upload} alt='Upload' className='upload-profile' />
        </label>
        <div className='filebox'>
            <Controller
                name='profileImage'
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                <input
                    type='file'
                    id='file'
                    className='upload-profile'
                    accept='image/*'
                    onChange={(e) => {
                        field.onChange(e.target.files);
                        handlePhotoChange(e.target.files);
                    }}
                />
            )}
        />
        </div>
    </div>
    );
}

export default ProfileImage