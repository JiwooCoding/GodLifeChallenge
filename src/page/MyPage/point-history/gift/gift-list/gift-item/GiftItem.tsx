import { IGiftPoint } from '../../../../../../type/IGiftPoint'
import { formatDate } from '../../../../../../utils/formatData';
import styles from './GiftItem.module.scss'

interface GiftItemProps {
    item:IGiftPoint;
}

const GiftItem = ({item}:GiftItemProps) => {
    return (
        <li>
            <div className={styles.gift_result}>
                <div className={styles.gift_date}>{formatDate(item.createdAt)}</div>
                <div className={styles.gift_description}>{item.description}</div>
                <div className={styles.gift_points}>{item.points}</div>
            </div>
        </li>
    )
}

export default GiftItem