import { UseFormRegister, FieldValues, Path, RegisterOptions } from 'react-hook-form';
import styles from './InputField.module.scss'

interface InputFieldProps<T extends FieldValues> { // T가 FieldValues를 상속
    id: Path<T>;  
    label: string;
    type: string;
    placeholder?: string;
    activeInput?: string;
    register: UseFormRegister<T>;
    onFocus: (inputId: Path<T>) => void;
    onBlur: () => void;
    step?: number;
    min?: number;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
    value,
    onChange
}: InputFieldProps<T>) => {

    const validationRules: RegisterOptions<T> = {
        required: true,
        min: min ? { value: min, message: `최소값은 ${min}이어야 합니다.` } : undefined,
    };

    return (
        <div className={styles.product_items}>
            <label htmlFor={id as string}>
                {label}<span style={{color:'red'}}>*</span>
            </label>
            <input
                id={id as string}
                className={` ${activeInput === id ? 'active' : ''}`}
                type={type}
                placeholder={placeholder}
                {...register(id, validationRules)}
                onFocus={() => onFocus(id)}
                onBlur={onBlur}
                value={value}
                min={min}
                step={step}
                onChange={onChange}
            />
        </div>
    );
};

export default InputField;
