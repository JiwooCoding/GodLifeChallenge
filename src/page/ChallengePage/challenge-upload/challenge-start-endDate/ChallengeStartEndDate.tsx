import { useEffect, useState } from 'react';
import ChallengeCalendar from '../../../../components/challenge-calendar/ChallengeCalendar'
import styles from './ChallengeStartEndDate.module.scss'

interface ChallengeStartEndDateProps {
    activeInput: string;
    onFocus: (inputId:string) => void;
    onBlur: () => void;
}

const ChallengeStartEndDate = ({activeInput, onBlur, onFocus }:ChallengeStartEndDateProps) => {
    
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    const handleStartDateChange = (date:Date | null) => {
        setStartDate(date);
    }

    const handleEndDateChange = (date:Date | null) => {
        setEndDate(date);
    }
    
    useEffect(() => {

        // 상태 값 변경 시 콘솔 로그
        console.log('startDate:', startDate);
        console.log('endDate:', endDate);
        if(startDate && endDate){
            const start = new Date(startDate);
            const end = new Date(endDate);

            if(end.getTime() < start.getTime()) {
                alert('종료일은 시작일보다 이전일 수 없습니다')
                setEndDate(null);
            }else if(end.getTime() === start.getTime()){
                alert('시작일과 종료일이 같습니다');
                setEndDate(null);
            }
        }
    }, [startDate, endDate]);
    
    
    return (
        <div className={styles.date_container}>
            <div>
                <h1>기간<span>*</span></h1>
            </div>
            <div className={styles.datebox}>
                <ChallengeCalendar
                    id='startDate'
                    //label='시작일'
                    activeInput={activeInput}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    onChange={handleStartDateChange}
                    placeholderText='시작일'
                    
                />
                ~
                <ChallengeCalendar
                    id='endDate'
                    //label='종료일'
                    activeInput={activeInput}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    onChange={handleEndDateChange}
                    placeholderText='종료일'
                />
            </div>
        </div>
    )
}

export default ChallengeStartEndDate