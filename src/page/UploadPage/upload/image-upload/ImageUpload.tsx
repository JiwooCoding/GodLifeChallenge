import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import styles from '../ProductUploadForm.module.scss'

type ImageUploadProps<T extends FieldValues> = {
    control: Control<T>;
    preview: string;
    handlePhotoChange: (files: FileList | null) => void;
    label: string;
    name: Path<T>;  // `keyof T` 대신 `Path<T>` 사용
    accept?: string;
    multiple?: boolean;
};

const ImageUpload = <T extends FieldValues>({
    control,
    preview,
    handlePhotoChange,
    label,
    name,  
    accept = "image/*",
    multiple = false,
}: ImageUploadProps<T>) => {
    return (
        <div className={styles.product_items}>
            <div>
                <label htmlFor={name as string}>{label}</label>
                <div className={styles.image_container}>
                    <img src={preview} alt="미리보기" style={{ marginTop: '0px', maxWidth: '100px' }} />
                    <div>
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
                                        handlePhotoChange(e.target.files);
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

export default ImageUpload;
