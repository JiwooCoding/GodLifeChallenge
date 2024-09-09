import { IChallengeHistory } from '../../../../type/challengeData'
import { calculatorDday } from '../../../../utils/calculatorDday';
import ParticipationButton from '../appliedChallenge-button/participationButton/ParticipationButton'
import styles from './AppliedItem.module.scss'

const ParticipationItem = ({item}:{item:IChallengeHistory}) => {
    
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
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
                        <span>{item.startDate} - {item.endDate}</span>
                        <span>{item.uploadStartTime} - {item.uploadEndTime}</span>
                    </div>
                </div>
            </div>
            <div className={styles.item_button}>
                <ParticipationButton 
                    challengeId={item.id}
                    startDate={item.startDate}
                    endDate={item.endDate}
                    startTime={item.uploadStartTime}
                    endTime={item.uploadEndTime}
                    title={item.title}
                />
            </div>
        </li>
    )
}

export default ParticipationItem