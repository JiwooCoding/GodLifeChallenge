import { useState, useEffect } from 'react';
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

const RCalendar = () => {

    const [date, setDate] = useState<Date>(new Date());
    const [checkIns, setCheckIns] = useState<string[]>([]); //출석체크 한 날짜들
    const [attendanceCount, setAttendance] = useState(0); //누적출석 횟수
    const [hasAttendance, setHasAttendance] = useState(false); //출석 여부
    const [isButtonDisabled, setIsButtonDisabled] = useState(false); //버튼 비활
    const [totalPoints, setTotalPoints] = useState<number>(0); //누적포인트 

    const { user } = useUser();
    const dispatch = useAppdispatch();

    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth();

    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);

    const todayString = new Date().toDateString();
    
    const eventId = "cea04e38-5393-4c3c-b78c-c660b1becb1f";

    useEffect(() => {
        const fetchAttendanceData = async () => {
            try {
                const response = await api.get(`/api/event/monthlyCount/${eventId}`);
                setTotalPoints(response.data.totalPoints || 0); // 서버에서 가져온 출석 누적 포인트
                setAttendance(response.data.attendanceCount || 0); // 서버에서 가져온 출석 횟수
                setHasAttendance(response.data.hasAttendance); // 서버에서 가져온 출첵 여부

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

        const newAttendance = attendanceCount + 1;
        setAttendance(newAttendance);
        setHasAttendance(true);
        setIsButtonDisabled(true);

        const earnedPoints = newAttendance % 10 === 0 ? 200 : 100;
        const updatePoints = totalPoints + earnedPoints;
        setTotalPoints(updatePoints);

        const todayDateString = new Date().toDateString();
        const updatedCheckIns = [...checkIns, todayDateString];
        setCheckIns(updatedCheckIns);

        try {
            await api.post(`/api/event/participate/${eventId}`,{
                attendanceCount,
                hasAttendance,
                totalPoints
            });
        } catch (error) {
        console.log(error);
        }
    };

    return (
        <div>
            <div className='attendance_info'>
                <span>출석 <b>{attendanceCount}</b>일차</span>
                <span>누적 포인트 <b>{totalPoints}</b></span>
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
