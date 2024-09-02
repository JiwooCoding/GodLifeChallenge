import { UseFormRegister } from 'react-hook-form';
import styles from './TextareaField.module.scss'
import { FormValues } from '../../page/ChallengePage/challenge-upload/ChallengeUpload';

interface TextareaFieldProps {
    id: keyof FormValues; 
    label: string;
    activeInput: string;
    onFocus: (inputId: keyof FormValues) => void;
    onBlur: () => void;
    register: UseFormRegister<FormValues>;
    placeholderText?:string;
}

const TextareaField = ({id, label, activeInput, register, onBlur, onFocus, placeholderText}:TextareaFieldProps) => {
    return (
        <div className={styles.textField}>
            <label htmlFor={id as string}>
                {label}<span style={{color:'red'}}>*</span>
            </label>
            <textarea
                id={id as string}
                className={` ${activeInput === id ? 'active' : ''}`}
                {...register(id, { required: true })}
                onFocus={() => onFocus(id)}
                onBlur={onBlur}
                placeholder={placeholderText}
            />
        </div>
    )
}

export default TextareaField