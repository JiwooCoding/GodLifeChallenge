import { IChallengeHistory } from '../../../../type/challengeData'
import styles from './RegisterChallengeItem.module.scss'

const RegisterChallengeItem = ({item}:{item:IChallengeHistory}) => {
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
                {/* 버튼 들어갈 자리 */}
            </div>
        </li>
    )
}

export default RegisterChallengeItem