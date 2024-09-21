import dayjs from 'dayjs'
import { UserChallengeRecord } from '../../../../type/challengeData'
import RegisterChallengeButton from '../registerChallenge-button/RegisterChallengeButton'
import styles from './RegisterChallengeItem.module.scss'
import { calculatorDday } from '../../../../utils/calculatorDday'
import { formattedDate } from '../../../../utils/formattedDate'
import { formattedTime } from '../../../../utils/formattedTime'

interface ReigsterProps {
    item:UserChallengeRecord;
    onDelete:(id:string) => void;
}

const RegisterChallengeItem = ({item, onDelete}:ReigsterProps) => {
    
    const today = dayjs().format('YYYY-MM-DD');
    const isChallengeEnded = today > item.endDate;
    const Dday = calculatorDday(today, item.startDate);
    
    return (
        <li className={`${styles.itembox} ${isChallengeEnded ? styles.ended : ''}`}>
            <div className={styles.item_info}>
                <div className={styles.item_info_mainImage}>
                    <img src={item.mainImage} alt='mainImage'/>
                    {today < item.startDate && <div className={styles.imageDday_msg}>{Dday}일 남음</div>}
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
                <RegisterChallengeButton
                    challengeId={item.id}
                    startDate={item.startDate}
                    endDate={item.endDate}
                    startTime={item.uploadStartTime}
                    endTime={item.uploadEndTime}
                    onDelete={onDelete}
                />
            </div>
        </li>
    )
}

export default RegisterChallengeItem