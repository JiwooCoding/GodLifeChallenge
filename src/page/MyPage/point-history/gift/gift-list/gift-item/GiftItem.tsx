import { IGiftPoint } from '../../../../../../type/IGiftPoint'
import { formatDate } from '../../../../../../utils/formatData';
import styles from './GiftItem.module.scss'

interface GiftItemProps {
    item:IGiftPoint;
}

const GiftItem = ({item}:GiftItemProps) => {

    const isNegative = item.points < 0;

    return (
        <li>
            <div className={styles.gift_result}>
                <div className={styles.gift_date}>{formatDate(item.createdAt)}</div>
                <div className={styles.gift_description}>{item.description}</div>
                <div
                    className={
                        isNegative
                            ? `${styles.gift_points} ${styles.gift_points_negative}`
                            : `${styles.gift_points} ${styles.gift_points_positive}`
                    }
                >
                    {item.points}
                </div>
            </div>
        </li>
    )
}

export default GiftItem