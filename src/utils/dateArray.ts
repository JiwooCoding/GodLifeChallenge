import dayjs from "dayjs"

export const dateArray = (date:string) => {
    const startDate = dayjs(date);
    const today = dayjs();

    //시작 날짜와 오늘 날짜 간의 일수 계산
    const totalDays = today.diff(startDate, 'day') +1; // +1 => 오늘 날짜 포함

    //fill(null)사용 이유?
    //배열의 길이를 설정하고, 그 길이에 맞는 값들을 map에사 계산해 할당하기 위함
    const array = Array(totalDays).fill(null).map((_, index) => 
    startDate.add(index, 'day').format('YYYY-MM-DD'));

    return array;
}