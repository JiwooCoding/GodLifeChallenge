import { useState } from 'react'
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import styles from './ExampleImageField.module.scss'
import { LuCircle } from 'react-icons/lu';
import { IoMdClose } from "react-icons/io";

interface ExampleImageFieldProps<T extends FieldValues> {
    control: Control<T>;
    handlePhotoChange?: (files: FileList | null) => void;
    name: string;
    accept?: string;
    multiple?: boolean;
    initialPreview:string;
}

const ExampleImageField = <T extends FieldValues>({
    control,
    handlePhotoChange,
    name,
    accept = "image/*",
    multiple = false,
    initialPreview,
}:ExampleImageFieldProps<T>) => {
    
    const [preview, setPreview] = useState<string>(initialPreview);
    const [selected, setSelected] = useState<boolean>(false);

    const handleImageChange = (files: FileList | null) => {
        if (files && files.length > 0) {
            const file = files[0];
            const fileURL = URL.createObjectURL(file);
            setPreview(fileURL);
            setSelected(true);

            if (handlePhotoChange) handlePhotoChange(files);
        }else{
            setSelected(false);
            setPreview(initialPreview);
        }
    };
    
    return (
        <div>
            <img
                src={preview}
                alt="성공 미리보기"
                onClick={() => document.getElementById(`${name}`)?.click()}
            />
            <div className={`${styles.bottom} ${selected ? (name === 'successImage' ? styles.success : styles.fail) : styles.unselected}`}>
                {name === "successImage" ? (<LuCircle size={17}/>) : (<IoMdClose size={20}/>)}
                
            </div>
            <div style={{ display: 'none' }}>
                <Controller
                    name={name as Path<T>}
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
                                handleImageChange(e.target.files);
                            }}
                        />
                    )}
                />
            </div>
        </div>
    )
}

export default ExampleImageField