import dayjs from 'dayjs';

export const calculatorDday = (startDateStr: string, endDateStr: string) => {
    // string 형식의 날짜를 Day.js 객체로 변환
    const startDate = dayjs(startDateStr);
    const endDate = dayjs(endDateStr);

    // endDate와 startDate 간의 차이를 일 단위로 계산
    const diffDays = endDate.diff(startDate, 'day');

    return diffDays;
};
