import styles from './ChallengeItem.module.scss'
import { UserHistory } from '../../../../../../type/challengeData'
import dayjs from 'dayjs'

const ChallengeItem = ({item}:{item:UserHistory}) => {
    return (
        <li className={styles.history_item}>
            <div className={styles.history_result}>
                <div className={styles.date}>{dayjs(item.changeDate).format('YYYY.MM.DD')}</div>
                <div className={styles.title}>{item.title}</div>
                <div className={styles.reason}>{item.status}</div>
                <div className={styles.point}>{item.point}</div>
            </div>
        </li>
    )
}

export default ChallengeItem