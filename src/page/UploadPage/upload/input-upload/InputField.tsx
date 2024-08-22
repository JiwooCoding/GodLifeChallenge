// InputField.tsx
import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import { FormValues } from '../ProductUploadForm';
import styles from '../ProductUploadForm.module.scss'

interface InputFieldProps {
    id: string;
    label: string;
    type: string;
    placeholder: string;
    activeInput: string;
    register: UseFormRegister<FormValues>;
    onFocus: (inputId: string) => void;
    onBlur: () => void;
    step?: number;
    min?: number;
}

const InputField: React.FC<InputFieldProps> = ({
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
}) => {
    return (
        <div className={styles.product_items}>
            <label htmlFor={id}>{label}</label>
            <input
                id={id}
                className={` ${activeInput === id ? 'active' : ''}`}
                type={type}
                placeholder={placeholder}
                {...register(id as keyof FormValues, { required: true})}
                onFocus={() => onFocus(id)}
                onBlur={onBlur}
                min={min}
                step={step}
            />
        </div>
    );
};

export default InputField;
