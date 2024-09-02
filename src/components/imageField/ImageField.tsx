import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import styles from './ImageField.module.scss'
import { useState } from 'react';
import noImage from '../../image/noImage.jpeg'
import { handlePhotoChange } from '../../utils/handlePhotoChange';

type ImageUploadProps<T extends FieldValues> = {
    control: Control<T>;
    preview?: string;
    handlePhotoChange?: (files: FileList | null) => void;
    label: string;
    name: Path<T>;  // `keyof T` 대신 `Path<T>` 사용
    accept?: string;
    multiple?: boolean;
};

const ImageField = <T extends FieldValues>({
    control,
    //handlePhotoChange,
    label,
    name,  
    accept = "image/*",
    multiple = false,
}: ImageUploadProps<T>) => {

    const [preview, setPreview] = useState<string>(noImage);
    const [selected, setSelected] = useState<boolean>(false);

    const handleImageClick = () => {
        document.getElementById(name)?.click();
    }

    return (
        <div className={styles.image}>
            <label htmlFor={name as string}>
                {label}<span style={{color:'red'}}>*</span>
            </label>
            <div className={styles.image_container}>
                <img src={preview} alt="미리보기" onClick={handleImageClick}/>
                <div style={{display:'none'}}>
                    <Controller
                        name={name}  // `keyof T` 대신 `Path<T>` 사용
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <input
                                type="file"
                                id={name as string}
                                accept={accept}
                                multiple={multiple}
                                onChange={(e) => {
                                    field.onChange(e.target.files);
                                    handlePhotoChange(e.target.files,setPreview,noImage,setSelected);
                                }}
                            />
                        )}
                    />
                </div>
            </div>
        </div>
    );
};

export default ImageField;
