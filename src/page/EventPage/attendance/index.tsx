import styles from './attendance-content/AttendanceContent.module.scss'
import background from '../../../image/event/attendance-cover/출석체크 이벤트 (6).png'
import RCalendar from '../../../components/calendar/RCalendar'

const Attendance = () => {
    const date = new Date();
    const month = date.getMonth() + 1;

    return (
        <div>
            <div className={styles.event_top}>
                <h1>출석체크 이벤트🎉</h1>
                <div className={styles.event_detail}>
                    <p>08.01 MON-08.31 WED</p>
                </div>
            </div>
            <div className={styles.background}>
                <img src={background} alt='background'/>
                <div className={styles.inner_calendar}>
                    <div className={styles.inner_text}>
                        <h1>{month}월</h1>
                        <div className={styles.inner_text_check}>
                            
                        </div>
                    </div>
                    <RCalendar/>
                </div>  
            </div>
        </div>
    )
} 

export default Attendance