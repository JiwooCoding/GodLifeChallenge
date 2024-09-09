import { UseFormRegister } from 'react-hook-form';
import TimeField from '../../../../components/timeField/TimeField';
import styles from './ChallengeTime.module.scss';
import { FormValues } from '../../../../type/challengeData';

interface ChallengeTimeProps {
    register: UseFormRegister<FormValues>;
    onFocus: (inputId: string) => void;
    onBlur: () => void;
    activeInput: string;
}

const ChallengeTime = ({
    register,
    onFocus,
    onBlur,
    activeInput,
}: ChallengeTimeProps) => {
    return (
        <div className={styles.challengeTime}>
            <h1>시간<span>*</span></h1>
            <span className={styles.notice}>시계 아이콘을 클릭해서 시간을 설정해주세요</span>
            <div className={styles.callengeTimebox}>
                <TimeField
                    id='uploadStartTime'
                    label='시작 시간'
                    activeInput={activeInput}
                    register={register}
                    onFocus={onFocus}
                    onBlur={onBlur}
                />
                <TimeField
                    id='uploadEndTime'
                    label='종료 시간'
                    activeInput={activeInput}
                    register={register}
                    onFocus={onFocus}
                    onBlur={onBlur}
                />
            </div>
        </div>
    );
};

export default ChallengeTime;
