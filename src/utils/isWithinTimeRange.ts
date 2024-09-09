export const isWithinTimeRange = (startTime:string, endTime:string):boolean => {
    const currentTime = new Date(); //2024-09-07T08:30:00

    const [startHour, startMin] = startTime.split(':').map(Number); // [08:00].map(Number) => [8,0]
    const [endHour, endMin] = endTime.split(':').map(Number);

    const start = new Date(); //새로운 Date 객체 만들어줌
    start.setHours(startHour, startMin, 0, 0); //2024-09-07T08:00:00 

    const end = new Date();
    end.setHours(endHour, endMin, 0, 0); //2024-09-07T09:00:00

    return currentTime >= start && currentTime <= end;
}