import { UseFormRegister, Path } from 'react-hook-form';
import styles from './TimeField.module.scss';
import { FormValues } from '../../page/ChallengeUploadPage/challenge-upload/ChallengeUpload';

interface TimeFieldProps {
    id: Path<FormValues>;
    label: string;
    activeInput: string;
    register: UseFormRegister<FormValues>;
    onFocus: (inputId: string) => void;
    onBlur: () => void;
}

const TimeField = ({
    id,
    activeInput,
    register,
    label,
    onFocus,
    onBlur,
}: TimeFieldProps) => {
    return (
        <div className={styles.timeField}>
            <input
                type="time"
                id={id as string}
                {...register(id)}
                className={`${activeInput === id ? 'active' : ''}`}
                onFocus={() => onFocus(id)}
                onBlur={onBlur}
                time-placeholder={label}
            />
        </div>
    );
};

export default TimeField;
