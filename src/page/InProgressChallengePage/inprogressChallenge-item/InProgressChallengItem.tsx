import dayjs from 'dayjs';
import { IChallenge } from '../../../type/IChallenge'
import { calculatorDday } from '../../../utils/calculatorDday';
import { formattedDate } from '../../../utils/formattedDate';
import { formattedTime } from '../../../utils/formattedTime';
import AuthButton from '../../AppliedChallengePage/appliedChallenge-list/appliedChallenge-button/authButton/AuthButton';
import styles from './InProgressChallengItem.module.scss'

const InProgressChallengItem = ({item}:{item:IChallenge}) => {

    const today = dayjs();
    const todayStr = today.format('YYYY-MM-DD');
    const Dday = calculatorDday(todayStr, item.startDate);

    return (
        <li className={styles.itembox}>
            <div className={styles.item_info}>
                <div className={styles.item_info_mainImage}>
                    <img src={item.mainImage} alt='mainImage'/>
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
                    hasCheckedIn={item.hasCheckedInToday}
                />
            </div>
        </li>
    )
}

export default InProgressChallengItem