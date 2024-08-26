import { IEventHistoryData } from '../../../../../type/eventData'
import { formatDate } from '../../../../../utils/formatData';
import styles from './EventItem.module.scss'

interface EventItemProps {
  item:IEventHistoryData;
}

const EventItem = ({item}:EventItemProps) => {
  return (
    <li>
      <div className={styles.event_result}>
        <div className={styles.event_date}>{formatDate(item.createdAt)}</div>
        <div className={styles.event_description}>{item.description}</div>
        <div className={styles.event_points}>{item.points}</div>
      </div>
    </li>
  )
}

export default EventItem