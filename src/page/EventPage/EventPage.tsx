import { useState } from 'react';
import eventData from '../../data/eventData';
import { Link } from 'react-router-dom';
import styles from './EventPage.module.scss';
import { IEventData } from '../../type/eventData';


const EventPage = () => {
    const [filter, setFilter] = useState('all');
    const [filteredEvents, setFilteredEvents] = useState<IEventData[]>(eventData);

    const isEventPast = (endDate: Date) => {
        const today = new Date();
        
        // 종료일에 하루를 더해, 다음 날 00:00부터 과거로 처리
        const endOfEvent = new Date(endDate);
        endOfEvent.setHours(23, 59, 59, 999); // 종료일을 포함하도록 마지막 순간까지 설정
    
        return today > endOfEvent;
    };
    

    const filterEvents = () => {
        switch (filter) {
            case 'ongoing':
                return filteredEvents.filter(event => !isEventPast(event.endDate));
            case 'past':
                return filteredEvents.filter(event => isEventPast(event.endDate));
            default:
                return filteredEvents;
        }
    };

    const sortedEventData = [...filterEvents()].sort((a, b) => {
        const aIsPast = isEventPast(a.endDate);
        const bIsPast = isEventPast(b.endDate);

        if (aIsPast && !bIsPast) return 1;
        if (!aIsPast && bIsPast) return -1;
        return 0;
    });

    return (
        <div className="inner">
            <div>
            <h1 className={styles.page_title}>이벤트 참여</h1>
                {/* <WeatherApi /> */}
                <div className={styles.event_top}>
                    <div className={styles.filterButtons}>
                        <button onClick={() => setFilter('all')} className={filter === 'all' ? styles.active : ''}>전체</button>
                        <button onClick={() => setFilter('ongoing')} className={filter === 'ongoing' ? styles.active : ''}>진행중</button>
                        <button onClick={() => setFilter('past')} className={filter === 'past' ? styles.active : ''}>종료</button>
                    </div>
                </div>
                <ul className={styles.eventList}>
                    {sortedEventData.map(event => {
                        const isPast = isEventPast(event.endDate);
                        const statusClass = isPast ? 'past' : 'ongoing';
                        return (
                            <li key={event.id} className={`${styles.eventItem} ${isPast ? styles.pastEvent : ''}`}>
                                <div>
                                    <Link to={`/${event.path}`}>
                                        <img
                                            src={event.imageUrl}
                                            alt='eventImage'
                                            style={{ width: '540px', height: '240px', cursor: 'pointer' }}
                                        />
                                    </Link>
                                </div>
                                <div className={styles.event_text}>
                                    <div className={styles.event_status}>
                                        <h1 className={`${styles.status} ${styles[statusClass]}`}>
                                            {isPast ? '종료' : '진행중'}
                                        </h1>
                                        <h2 className={styles.event_title}>{event.title}</h2>
                                        <h4 className={styles.event_description}>{event.description}</h4>
                                    </div>
                                    <div>
                                        <p className={styles.event_date}>{event.startDate.toLocaleDateString()} ~ {event.endDate.toLocaleDateString()}</p>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default EventPage;
