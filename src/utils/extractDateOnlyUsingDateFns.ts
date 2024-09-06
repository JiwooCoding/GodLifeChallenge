import { parse, format } from 'date-fns';

export const extractDateOnlyUsingDateFns = (datetimeStr: string): string => {
    // 문자열을 Date 객체로 변환
    const date = parse(datetimeStr, 'yyyy.MM.dd a h:mm', new Date());
    // 날짜만 포맷팅하여 반환
    return format(date, 'yyyy.MM.dd');
};
