import styles from './AttendanceInfo.module.scss'

interface AttendanceInfoProps {
    attendanceCount:number;
    totalPoints:number;
}

const AttendanceInfo = ({attendanceCount, totalPoints}:AttendanceInfoProps) => {
    return (
        <div className={styles.attendance_info}>
            <span>출석 <b>{attendanceCount}</b>일차</span>
            <span>누적 포인트 <b>{totalPoints}</b></span>
        </div>
    )
}

export default AttendanceInfo