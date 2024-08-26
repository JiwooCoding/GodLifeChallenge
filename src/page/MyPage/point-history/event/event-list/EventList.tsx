import { useEffect, useState } from 'react'
import styles from './EventList.module.scss'
import { IEventHistoryData } from '../../../../../type/eventData';
import usePagination from '../../../../../hooks/usePagination';
import api from '../../../../../api/api';
import Loading from '../../../../../components/loading/Loading';
import EventItem from '../event-item/EventItem';
import Pagination from '../../../../../components/pagination/Pagination';


const EventList = () => {

  const [eventList, setEventList] = useState<IEventHistoryData[]>([]);
  const [itemsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const pageCount = Math.ceil(eventList.length / itemsPerPage);
  const {currentPage, handlePageClick} = usePagination();

  useEffect(() => {
    const fetchEventList = async() => {
      try {
        const response = await api.get<IEventHistoryData[]>('/api/points/event-record');
        console.log('event => ',response.data);
        setEventList(response.data);
      } catch (error) {
        console.log('이벤트 포인트 적립 및 사용 내역 가져오기 에러',error);
      } finally{
        setLoading(false);
      }
    }

    fetchEventList();
  }, [])
  
  const currentEvent = eventList.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  return (
    <>
      <div className={styles.event_header}>
          <div className={styles.event_date}>날짜</div>
          <div className={styles.event_description}>내역</div>
          <div className={styles.event_points}>포인트</div>
      </div>
      {loading ? (
        <Loading/>
      ) : currentEvent.length > 0 ? (
        <>
          <ul>
            {currentEvent.map((event, index) => (
              <EventItem 
                key={index}
                item={event}
              />
            ))}
          </ul>
          <Pagination
            pageCount={pageCount}
            handlePageClick={handlePageClick}
          />
        </>
      ) : (
        <div className={styles.noEvent}>참여한 이벤트가 없습니다</div>
      )}
    </>
  )
}

export default EventList