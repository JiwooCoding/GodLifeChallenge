// RCalendar.tsx
import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './RCalendar.scss';
import api from '../../api/api';
import moment from 'moment';
import Button from './button/Button';
import { useUser } from '../../UserProvider';
import { useAppdispatch } from '../../hooks/redux';
import { openModal } from '../../store/modal/modal.slice';
import NoUserModal from '../modal/no-user/NoUserModal';


const RCalendar: React.FC = () => {
    const [date, setDate] = useState<Date>(new Date());
    const [checkIns, setCheckIns] = useState<string[]>([]);
    const [attendance, setAttendance] = useState(0);
    const [hasAttendance, setHasAttendance] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [point, setPoint] = useState<number>(0);

    const { user } = useUser();
    const dispatch = useAppdispatch();

    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth();

    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);

    const todayString = new Date().toDateString();

    useEffect(() => {
        const fetchAttendanceData = async () => {
            try {
                const response = await api.get('/api/points/attendancePoints');
                setPoint(response.data.point || 0);
                setAttendance(response.data.attendance || 0);
                setHasAttendance(response.data.hasAttendance);

                if (response.data.hasAttendance === true) {
                    setIsButtonDisabled(true);
                }

                const checkInsFromServer = response.data.createdAt || [];
                setCheckIns(checkInsFromServer.map((date: string) => new Date(date).toDateString()));

            } catch (error) {
                console.log(error);
            }
        };

        fetchAttendanceData();
    }, []);

    const BtnClickHandler = async () => {
        if(!user){
            dispatch(openModal(<NoUserModal/>));
            return;
        };

        if (hasAttendance) {
            alert('이미 출석체크를 하셨습니다.');
            setIsButtonDisabled(true);
            return;
        }

        const newAttendance = attendance + 1;
        setAttendance(newAttendance);
        setHasAttendance(true);
        setIsButtonDisabled(true);

        const earnedPoints = newAttendance % 10 === 0 ? 200 : 100;
        const updatePoints = point + earnedPoints;
        setPoint(updatePoints);

        const todayDateString = new Date().toDateString();
        const updatedCheckIns = [...checkIns, todayDateString];
        setCheckIns(updatedCheckIns);

        try {
            await api.post('/api/attendance', {
                earnedPoints,
                attendance: newAttendance,
                hasattendance: hasAttendance
            });

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <div className='attendance_info'>
                <span>출석 <b>{attendance}</b>일차</span>
                <span>누적 포인트 <b>{point}</b></span>
            </div>
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
                tileDisabled={({ _, view }) => {
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
            <div className="button-container">
                <Button
                    hasAttendance={hasAttendance}
                    clickHandler={BtnClickHandler}
                    disabled={isButtonDisabled}
                />
            </div>
        </div>
    );
};

export default RCalendar;
