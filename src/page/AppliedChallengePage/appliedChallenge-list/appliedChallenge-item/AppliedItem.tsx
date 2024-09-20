import dayjs, { Dayjs } from 'dayjs';
import { calculatorDday } from '../../../../utils/calculatorDday';
import { formattedDate } from '../../../../utils/formattedDate';
import { formattedTime } from '../../../../utils/formattedTime';
import AuthButton from '../appliedChallenge-button/authButton/AuthButton';
import styles from './AppliedItem.module.scss'
import { useNavigate } from 'react-router-dom';
import { IChallenge } from '../../../../type/IChallenge';

interface AppliedItemProps {
    hasCheckedIn:boolean;
    item:IChallenge;
}

const AppliedItem = ({item, hasCheckedIn}:AppliedItemProps) => {

    const navigate = useNavigate();
    
    const goToDetailPage = () => {
        navigate(`/challenge/detail/${item.userChallengeId}`);
    }

    const today: Dayjs = dayjs(); 
    const todayStr = today.format('YYYY-MM-DD')
    const Dday = calculatorDday(todayStr, item.startDate);
    const endDateTime = dayjs(`${item.endDate} ${item.uploadEndTime}`, 'YYYY-MM-DD HH:mm');


    return (
        <li className={styles.itembox}>
            <div className={styles.item_info} onClick={goToDetailPage}>
                <div className={styles.item_info_mainImage}>
                    <img src={item.mainImage} alt='mainImage'/>
                    {today > endDateTime && <div className={styles.imageFinished_msg}></div>}
                    {todayStr < item.startDate && <div className={styles.imageDday_msg}>{Dday}일 남음</div>}
                </div>
                <div className={styles.item_info_text}>
                    <h2>{item.title}</h2>
                    <div className={styles.item_info_text_date}>
                        <span>{formattedDate(item.startDate)} - {formattedDate(item.endDate)}</span>
                        <span>{formattedTime(item.uploadStartTime)} - {formattedTime(item.uploadEndTime)}</span>
                    </div>
                </div>
            </div>
            <div className={styles.item_button}>
                <AuthButton 
                    challengeId={item.id}
                    startDate={item.startDate}
                    endDate={item.endDate}
                    startTime={item.uploadStartTime}
                    endTime={item.uploadEndTime}
                    title={item.title}
                    today={today}
                    todayStr={todayStr}
                    hasCheckedIn={hasCheckedIn}
                />
            </div>
        </li>
    )
}

export default AppliedItem