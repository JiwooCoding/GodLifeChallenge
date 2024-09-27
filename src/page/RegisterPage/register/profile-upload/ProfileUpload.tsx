import { useState } from 'react';
import noProfile from '../../../../image/login&register/NoUserImage.png';
import { Controller, useFormContext } from 'react-hook-form';
import styles from './ProfileUpload.module.scss'
import upload from '../../../../image/login&register/cameraIcon.png'

const ProfileUpload = () => {
    const [profileImage, setProfileImage] = useState<string>(noProfile);
    const { control } = useFormContext(); // useFormContext를 사용하여 부모 컴포넌트의 form context를 가져옴

    const handlePhotoChange = (files: FileList | null) => {
        if (files && files.length > 0) {
            const file = files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
            setProfileImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setProfileImage(noProfile);
        }
    };

    return (
        <div className={styles.profile_upload}>
            <img
                src={profileImage} 
                alt='noProfileImage' 
                className={styles.profile_image}
            />
            <label htmlFor='file'>
                <img 
                src={upload} 
                alt='upload-button' 
                className={styles.upload_profile}/>
            </label>
            <div className={styles.filebox}>
                <Controller
                    name='profileImage'
                    control={control}
                    rules={{ required: false }}
                    render={({ field }) => (
                        <input
                            className={styles.upload_profile}
                            type='file'
                            name='file'
                            id='file'
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

export default ProfileUpload;
