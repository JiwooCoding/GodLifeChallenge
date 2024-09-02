import { useState, forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './ChallengeCalendar.module.scss';
import { formatDateAndTime } from '../../utils/formatDataAndTime';
import { CiCalendar } from "react-icons/ci";
import { IoIosCloseCircle } from "react-icons/io";
import './ChallengeCalendar.css'

interface ChallengeCalendarProps {
    id: string;
    label?: string;
    activeInput: string;
    onFocus: (inputId: string) => void;
    onBlur: () => void;
    onChange: (date: Date | null) => void;
    placeholderText?: string;
}

const ChallengeCalendar = ({
    id,
    label,
    activeInput,
    onBlur,
    onFocus,
    onChange,
    placeholderText,
}: ChallengeCalendarProps) => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const lastDayOfMonth = new Date(selectedDate ? selectedDate.getFullYear() : tomorrow.getFullYear(), 
                                        selectedDate ? selectedDate.getMonth() + 1 : tomorrow.getMonth() + 1, 
                                        0);

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
        onChange(date);
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
                ref={ref} // ref 전달
                readOnly // 입력 필드를 읽기 전용으로 설정
            />
            <CiCalendar className={styles.calendarIcon}/>
            <IoIosCloseCircle className={styles.cancleIcon}/>
        </div>
    ));

    return (
        <div className={styles.datePicker_container}>
            {/* <label htmlFor={id}>
                {label}<span style={{ color: 'red' }}>*</span>
            </label> */}
            <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                minDate={tomorrow}
                maxDate={lastDayOfMonth}
                shouldCloseOnSelect
                closeOnScroll={true}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                timeCaption="time"
                dateFormat={formatDateAndTime(selectedDate)}
                customInput={<CustomInput value={selectedDate ? formatDateAndTime(selectedDate) : ''} onClick={() => {}} />}
            />
        </div>
    );
};

export default ChallengeCalendar;
