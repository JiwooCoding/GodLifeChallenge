import styles from './DonationItem.module.scss'
import { IDonationPoint } from '../../../../../../type/IDonationPoint'
import { formatDate } from '../../../../../../utils/formatData'

const DonationItem = ({item}:{item:IDonationPoint}) => {
  return (
    <li>
      <div className={styles.donation_result}>
        <div className={styles.donation_date}>{formatDate(item.createdAt)}</div>
        <div className={styles.donation_description}>{item.description}</div>
        <div className={styles.donation_points}>{item.points}</div>
      </div>
    </li>
  )
}

export default DonationItem