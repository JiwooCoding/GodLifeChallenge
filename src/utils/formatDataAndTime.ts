export const formatDateAndTime = (date: Date | null): string => {
    if (!date) return '';
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true, // Use 12-hour clock with AM/PM
    };
    return date.toLocaleString('ko-KR', options);
};