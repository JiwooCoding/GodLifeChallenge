import React from 'react';
import { UseFormRegister, FieldValues, Path } from 'react-hook-form';
import styles from '../ProductUploadForm.module.scss';

interface InputFieldProps<T extends FieldValues> { // T가 FieldValues를 상속
    id: Path<T>;  
    label: string;
    type: string;
    placeholder: string;
    activeInput: string;
    register: UseFormRegister<T>;
    onFocus: (inputId: Path<T>) => void;
    onBlur: () => void;
    step?: number;
    min?: number;
}

const InputField = <T extends FieldValues>({
    id,
    label,
    type,
    placeholder,
    activeInput,
    register,
    onFocus,
    onBlur,
    step,
    min,
}: InputFieldProps<T>) => {
    return (
        <div className={styles.product_items}>
            <label htmlFor={id as string}>{label}</label>
            <input
                id={id as string}
                className={` ${activeInput === id ? 'active' : ''}`}
                type={type}
                placeholder={placeholder}
                {...register(id, { required: true })}
                onFocus={() => onFocus(id)}
                onBlur={onBlur}
                min={min}
                step={step}
            />
        </div>
    );
};

export default InputField;
