import { useState } from 'react';
import eventData from '../../data/eventData';
import { Link } from 'react-router-dom';
import styles from './EventPage.module.scss';
import WeatherApi from '../../components/weather/WeatherApi';
import AutoComplete from '../../components/auto-complete/AutoComplete';
import { IEventData } from '../../type/eventData';


const EventPage = () => {
    const [filter, setFilter] = useState('all');
    const [filteredEvents, setFilteredEvents] = useState<IEventData[]>(eventData);

    const isEventPast = (endDate:Date) => {
        const today = new Date();
        return today > endDate;
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
        <div>
            <section className={styles.event_back}>
                <div className={styles.event_title}>
                    <h1>이벤트</h1>
                </div>
            </section>

            <div className="inner">
                <div>
                    {/* <WeatherApi /> */}
                    <div className={styles.event_top}>
                        <div className={styles.filterButtons}>
                            <button onClick={() => setFilter('all')} className={filter === 'all' ? styles.active : ''}>전체</button>
                            <button onClick={() => setFilter('ongoing')} className={filter === 'ongoing' ? styles.active : ''}>진행중</button>
                            <button onClick={() => setFilter('past')} className={filter === 'past' ? styles.active : ''}>종료</button>
                        </div>
                        <div>
                            <AutoComplete items={eventData} setFilteredItems={setFilteredEvents} displayProperty="title" />
                        </div>
                    </div>

                    <hr />
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
                                        <div className='mb-5'>
                                            <h1 className={`${styles.status} ${styles[statusClass]}`}>
                                                    {isPast ? '종료' : '진행중'}
                                            </h1>
                                            <h2 className='font-bold text-[17px] cursor-pointer'>{event.title}</h2>
                                            <h4 className='text-[14px] cursor-pointer'>{event.description}</h4>
                                        </div>
                                        <div>
                                            <p className='text-sm'>{event.startDate.toLocaleDateString()} ~ {event.endDate.toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default EventPage;
