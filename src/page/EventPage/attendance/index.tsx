import styles from './AttendanceContent.module.scss'
import background from '../../../image/event/attendance-cover/출석체크 이벤트 (6).png'
import RCalendar from './calendar/RCalendar'
import { useEffect, useState } from 'react';
import api from '../../../api/api';
import AttendanceButton from './attendance-button/AttendanceButton';
import AttendanceInfo from './attendance-info/AttendanceInfo';
import { useUser } from '../../../contexts/UserProvider';
import { useModal } from '../../../contexts/ModalProvider';
import Modal from '../../../components/modal';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

const Attendance = () => {

    const [totalPoints, setTotalPoints] = useState<number>(0); //누적포인트 
    const [hasAttendance, setHasAttendance] = useState(false); //출석 여부
    const [checkIns, setCheckIns] = useState<string[]>([]); //출석체크 한 날짜들
    const [attendanceCount, setAttendanceCount] = useState(0); //누적출석 횟수
    const [isButtonDisabled, setIsButtonDisabled] = useState(false); //버튼 비활

    const { user, setUser } = useUser();
    const {isOpen, openModal, closeModal} = useModal();
    const navigate = useNavigate();

    const date = new Date();
    const month = date.getMonth() + 1;

    const eventId = "cea04e38-5393-4c3c-b78c-c660b1becb1f";

    useEffect(() => {
        const fetchAttendanceData = async () => {
            try {
                const response = await api.get(`/api/event/monthlyCount/${eventId}`);
                setTotalPoints(response.data.totalPoints || 0); // 서버에서 가져온 출석 누적 포인트
                setAttendanceCount(response.data.attendanceCount || 0); // 서버에서 가져온 출석 횟수
                setHasAttendance(response.data.hasAttendance); // 서버에서 가져온 출첵 여부

                if (response.data.hasAttendance === true) {
                    setIsButtonDisabled(true);
                }

                const checkInsFromServer = response.data.attendanceList || [];
                setCheckIns(checkInsFromServer.map((date: string) => new Date(date).toDateString()));

            } catch (error) {
                console.log(error);
            }
        };

        fetchAttendanceData();
    }, []);

    const BtnClickHandler = async () => {

        if(!user){
            openModal();
        }

        if (hasAttendance) {
            alert('이미 출석체크를 하셨습니다.');
            setIsButtonDisabled(true);
            return;
        }

        const newAttendance = attendanceCount + 1;
        setAttendanceCount(newAttendance);
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

            setUser((prevUser) => {
                if (!prevUser) return prevUser;

                return {
                    ...prevUser,
                    totalPoint: prevUser.totalPoint + earnedPoints,
                };
            });
        } catch (error) {
        console.log(error);
        }
    };

    const firstDayOfMonth = dayjs().startOf('month').format('YYYY.MM.DD');
    const lastDayOfMonth = dayjs().endOf('month').format('YYYY.MM.DD');

    return (
        <>
            <div className={styles.event_top}>
                <h1>출석체크 이벤트🎉</h1>
                <div className={styles.event_detail}>
                    <p>{firstDayOfMonth} ~ {lastDayOfMonth}</p>
                </div>
            </div>
            <div className={styles.background}>
                <img src={background} alt='background'/>
                <div className={styles.inner_calendar}>
                    <div className={styles.inner_text}>
                        <h1>{month}월</h1>
                    </div>
                    <div className={styles.calendar_container}>
                        <AttendanceInfo 
                            totalPoints={totalPoints} 
                            attendanceCount={attendanceCount}
                        />
                        <RCalendar checkIns={checkIns}/>
                    </div>
                    <AttendanceButton
                        BtnClickHandler={BtnClickHandler}
                        isButtonDisabled={isButtonDisabled}
                        hasAttendance={hasAttendance}
                    />
                </div>  
            </div>
            {isOpen && (
                <Modal isOpen={isOpen} onClose={closeModal}>
                    <Modal.Header>
                        로그인
                    </Modal.Header>
                    <Modal.Content>
                        로그인이 필요한 이벤트입니다.
                    </Modal.Content>
                    <Modal.Footer>
                        <Modal.Button buttonStyle='button--primary' onClick={() => {navigate('/login'); closeModal();}}>로그인</Modal.Button>
                    </Modal.Footer>
                </Modal>
            )}
        </>
    )
} 

export default Attendance