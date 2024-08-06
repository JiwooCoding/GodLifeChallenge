import attendance from '../image/event/attendance-cover.png'
import roulette from '../image/event/roulette-cover.png'
import page from '../image/event/pageevent.png'

const date = new Date();
const month = date.getMonth() + 1;

const eventData = [
    {
        id:1, 
        imageUrl: attendance,
        title:`7월 출석체크 이벤트`,
        description: '출석체크하고 최대 5000포인트 받아세요❣️',
        startDate: new Date('2024-07-01'),
        endDate:new Date('2024-07-31'),
        path: 'attendance'
    },
    {
        id:2, 
        imageUrl: attendance,
        title:`${month}월 출석체크 이벤트`,
        description: '출석체크하고 최대 5000포인트 받아세요❣️',
        startDate: new Date('2024-08-01'),
        endDate:new Date('2024-08-31'),
        path: 'attendance'
    },
    {
        id:3, 
        imageUrl: roulette,
        title:'룰렛이벤트',
        description: '룰렛이벤트 참여하면 최대 5000포인트를 쏩니다!🎉🎁',
        startDate: new Date('2024-07-01'),
        endDate:new Date('2024-09-30'),
        path: 'roulette'
    },
    {
        id:4, 
        imageUrl: page,
        title:'페이지 이동 이벤트',
        description: '페이지에 접속만 하면 포인트가 팡팡!🎇💸',
        startDate: new Date('2024-07-01'),
        endDate:new Date('2024-10-31'),
        path: 'donation-detail'
    },
]

export default eventData;