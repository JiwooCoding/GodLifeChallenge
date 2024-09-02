import { useState } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import success from '../../../../image/challenge/successImage.png';
import fail from '../../../../image/challenge/failImage.png';
import styles from './ChallengeExamplePhoto.module.scss'
import { LuCircle } from "react-icons/lu";
import { IoMdClose } from "react-icons/io";

interface ChallengeExamplePhotoProps<T extends FieldValues> {
    control: Control<T>;
    handlePhotoChange?: (files: FileList | null) => void;
    label: string;
    name: Path<T>;
    accept?: string;
    multiple?: boolean;
}

const ChallengeExamplePhoto = <T extends FieldValues>({
    control,
    handlePhotoChange,
    label,
    name,
    accept = "image/*",
    multiple = false,
}: ChallengeExamplePhotoProps<T>) => {

    const [previewSuccess, setPreviewSuccess] = useState<string>(success);
    const [previewFail, setPreviewFail] = useState<string>(fail);
    const [successSelected, setSuccessSelected] = useState<boolean>(false);
    const [failSelected, setFailSelected] = useState<boolean>(false);

    const handleImageChange = (
        files: FileList | null, 
        setPreview: (src: string) => void,
        setSelected: (selected: boolean) => void
    ) => {
        if (files && files.length > 0) {
            const file = files[0];
            const fileURL = URL.createObjectURL(file);
            setPreview(fileURL);
            setSelected(true);

            if (handlePhotoChange) handlePhotoChange(files);
        }else{
            setSelected(false);
        }
    };

    return (
        <div className={styles.photo_container}>
            <label htmlFor={name as string}>
                {label}<span style={{color:'red'}}>*</span>
            </label>
            <div className={styles.photobox}>
                <div>
                    <img
                        src={previewSuccess}
                        alt="성공 미리보기"
                        onClick={() => document.getElementById(`${name}-success`)?.click()}
                    />
                    <div className={`${styles.success_bottom} ${successSelected ? styles.selected : styles.unselected}`}><LuCircle size={17}/></div>
                    <div style={{ display: 'none' }}>
                        <Controller
                            name={`${name}-success` as Path<T>}
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <input
                                    type="file"
                                    id={`${name}-success`}
                                    accept={accept}
                                    multiple={multiple}
                                    onChange={(e) => {
                                        field.onChange(e.target.files);
                                        handleImageChange(e.target.files, setPreviewSuccess, setSuccessSelected);
                                    }}
                                />
                            )}
                        />
                    </div>
                </div>
                <div>
                    <img
                        src={previewFail}
                        alt="실패 미리보기"
                        onClick={() => document.getElementById(`${name}-fail`)?.click()}
                    />
                    <div className={`${styles.fail_bottom} ${failSelected ? styles.selected : styles.unselected}`}><IoMdClose size={20}/></div>
                    <div style={{ display: 'none' }}>
                        <Controller
                            name={`${name}-fail` as Path<T>}
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <input
                                    type="file"
                                    id={`${name}-fail`}
                                    accept={accept}
                                    multiple={multiple}
                                    onChange={(e) => {
                                        field.onChange(e.target.files);
                                        handleImageChange(e.target.files, setPreviewFail, setFailSelected);
                                    }}
                                />
                            )}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChallengeExamplePhoto;
