import { useState, forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './ChallengeCalendar.module.scss';
import { CiCalendar } from "react-icons/ci";
import { IoIosCloseCircle } from "react-icons/io";
import { UseFormSetValue } from 'react-hook-form';
import { formatLocalDate } from '../../utils/formatLocalDate';
import { FormValues } from '../../type/challengeData';


interface ChallengeCalendarProps {
    id: keyof FormValues;
    label?: string;
    activeInput: string;
    onFocus: (inputId: string) => void;
    onBlur: () => void;
    onChange: (date: Date | null) => void;
    placeholderText?: string;
    setValue: UseFormSetValue<FormValues>;
    minDate?: Date; 
    disabled?: boolean;
}

const ChallengeCalendar = ({
    id,
    activeInput,
    onChange,
    setValue,
    placeholderText,
    minDate, 
    disabled
}: ChallengeCalendarProps) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // 오늘 날짜의 시간은 00:00:00로 설정

    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    const lastDayOfMonth = new Date(nextMonth.getFullYear(), nextMonth.getMonth() + 1, 0);

    const handleDateChange = (date: Date | null) => {
        console.log('Selected date:=============>', date); 
    
        if (date) {
            // 날짜를 UTC 기준으로 변환
            const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
            setSelectedDate(utcDate);
            onChange(utcDate);
            
            const localDateString = formatLocalDate(utcDate);
            console.log('Formatted date:', localDateString); 
            setValue(id, localDateString);
        } else {
            setSelectedDate(null);
            onChange(null);
            setValue(id, '');
        }
    };
    

    const clearInput = () => {
        setSelectedDate(null);
    };

    

    // forwardRef를 사용하여 ref를 지원하는 커스텀 Input 컴포넌트
    const CustomInput = forwardRef<HTMLInputElement, { value: string; onClick: () => void; }>(({ value, onClick }, ref) => (
        <div className={styles.customInputWrapper}>
            <input
                type="text"
                value={value}
                onClick={onClick}
                placeholder={placeholderText}
                className={`${styles.datePicker} ${activeInput === id ? 'active' : ''}`}
                ref={ref} 
                readOnly 
            />
            <CiCalendar className={styles.calendarIcon}/>
            <IoIosCloseCircle className={styles.cancleIcon} onClick={clearInput}/>
        </div>
    ));

    return (
        <div className={styles.datePicker_container}>
            <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                minDate={minDate || today} // 오늘 날짜 또는 minDate
                maxDate={lastDayOfMonth} // 달력의 최대 날짜
                filterDate={(date) => {
                    // 오늘 날짜 이전은 비활성화
                    return date.getTime() > today.getTime();
                }}
                shouldCloseOnSelect
                closeOnScroll={true}
                disabled={disabled}
                dateFormat="yyyy-MM-dd" // 날짜만 포맷
                customInput={<CustomInput value={selectedDate ? formatLocalDate(selectedDate) : ''} onClick={() => {}} />}
            />
        </div>
    );
};

export default ChallengeCalendar;
