import React from 'react';
import { UseFormRegister, FieldValues } from 'react-hook-form';

type InputFieldProps = {
    id: string;
    label: string;
    type: string;
    placeholder: string;
    activeInput: string;
    register: UseFormRegister<FieldValues>;
    onFocus: (inputId: string) => void;
    onBlur: () => void;
};

const InputField: React.FC<InputFieldProps> = ({
    id, label, type, placeholder, activeInput, register, onFocus, onBlur
}) => {
    return (
        <div className='product-items'>
            <label htmlFor={id}>{label}</label>
            <input
                id={id}
                className={`${activeInput === id ? 'active' : ''}`}
                type={type}
                onFocus={() => onFocus(id)}
                onBlur={onBlur}
                step={100}
                {...register(id, { required: true })}
                placeholder={placeholder}
            />
        </div>
    );
};

export default InputField;
