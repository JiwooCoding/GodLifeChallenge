import { useState } from 'react';
import ChallengeCalendar from '../../../../components/challengeCalendar/ChallengeCalendar';
import styles from './ChallengeDate.module.scss';
import { UseFormSetValue } from 'react-hook-form';
import { FormValues } from '../../../../type/challengeData';


interface ChallengeStartEndDateProps {
    activeInput: string;
    onFocus: (inputId: string) => void;
    onBlur: () => void;
    setValue: UseFormSetValue<FormValues>;
}

const ChallengeDate = ({ activeInput, onBlur, onFocus, setValue }: ChallengeStartEndDateProps) => {
    
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    const handleStartDateChange = (date: Date | null) => {
        setStartDate(date);
    };

    const handleEndDateChange = (date: Date | null) => {
        if(!startDate){
            alert('먼저 시작일을 선택해주세요');
            return;
        }
        setEndDate(date);
    };

    return (
        <div className={styles.date_container}>
            <div>
                <h1>기간<span>*</span></h1>
                {/* <p>• 챌린지 시작은 다음 날부터 가능합니다</p> */}
            </div>
            <div className={styles.datebox}>
                <ChallengeCalendar
                    id='startDate'
                    activeInput={activeInput}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    onChange={handleStartDateChange}
                    placeholderText='시작일'
                    setValue={setValue}
                />
                ~
                <ChallengeCalendar
                    id='endDate'
                    activeInput={activeInput}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    onChange={handleEndDateChange}
                    placeholderText='종료일'
                    setValue={setValue}
                    minDate={startDate || undefined}
                />
            </div>
        </div>
    );
};

export default ChallengeDate;
