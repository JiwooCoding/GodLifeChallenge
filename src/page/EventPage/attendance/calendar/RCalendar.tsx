import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './RCalendar.scss'
import moment from 'moment';

const RCalendar = ({checkIns}:{checkIns:string[]}) => {

    const [date, setDate] = useState<Date>(new Date());

    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth();

    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);

    const todayString = new Date().toDateString();

    return (
            <>
            <Calendar
                value={date}
                calendarType="gregory"
                formatDay={(_, date) => moment(date).format("DD")}
                minDate={firstDayOfMonth}
                maxDate={lastDayOfMonth}
                tileClassName={({ date, view }) => {
                    if (view === 'month') {
                        const dateString = date.toDateString();
                        if (checkIns.includes(dateString)) {
                            return 'check-in';
                        }
                        if (dateString === todayString) {
                            return 'today';
                        }
                    }
                    return null;
                }}
                tileDisabled={({ _ , view }) => {
                    if (view === 'month') {
                        return false;
                    }
                    return false;
                }}
                onClickDay={(value) => {
                    if (value.toDateString() !== todayString) {
                        return;
                    }
                    setDate(value);
                }}
                next2Label={null}
                prev2Label={null}
                nextLabel={null}
                prevLabel={null}
            />
            
        </>
    );
};

export default RCalendar;
