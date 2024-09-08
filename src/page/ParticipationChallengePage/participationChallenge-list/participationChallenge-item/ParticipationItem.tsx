import { IChallengeHistory } from '../../../../type/challengeData'
import ParticipationButton from '../participationChallenge-button/participationButton/ParticipationButton'
import styles from './ParticipationItem.module.scss'

const ParticipationItem = ({item}:{item:IChallengeHistory}) => {
    return (
        <li className={styles.itembox}>
            <div className={styles.item_info}>
                <div className={styles.item_info_mainImage}>
                    <img src={item.mainImage} alt='mainImage'/>
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