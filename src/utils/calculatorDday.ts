export const calculatorDday = (startDateStr:string, endDateStr:string) => {
    
    //string타입의 날짜 '2024-09-05' 형식을 Date타입으로 변환
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);

    const diffTime = endDate.getTime() - startDate.getTime();
    
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}