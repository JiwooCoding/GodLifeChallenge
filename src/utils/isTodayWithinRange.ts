// export const isTodayWithinRange = (startDate: string, endDate: string, todayStr: string): boolean => {
//     const start = new Date(startDate); // 2024-08-09
//     const end = new Date(endDate); // 2024-08-13


//     // 날짜들 간의 차이를 일(day) 단위로 계산
//     const dateRange = [];
//     for (let day = new Date(start); day <= end; day.setDate(day.getDate() + 1)) {
//         dateRange.push(new Date(day).toISOString().slice(0, 10)); // 'YYYY-MM-DD' 형식으로 저장
//     }

//     // todayStr이 dateRange 안에 있으면 true 반환
//     return dateRange.includes(todayStr);
// };


import dayjs from 'dayjs';

export const isTodayWithinRange = (startDate: string, endDate: string, todayStr: string): boolean => {
    const start = dayjs(startDate); // '2024-08-09'
    const end = dayjs(endDate); // '2024-08-13'
    const today = dayjs(todayStr); // 오늘 날짜

    // 시작일과 종료일 사이에 오늘이 포함되어 있는지 확인
    return today.isAfter(start.subtract(1, 'day')) && today.isBefore(end.add(1, 'day'));
};
