export const formattedTime = (time:string) => {
    const [hours, minutes] = time.split(':');
    return `${hours}시 ${minutes}분`;
}