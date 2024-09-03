export function formatLocalDate(date: Date | null): string {
    if (!date) return '';

    const localDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)); 

    // Format the date as 'YYYY-MM-DDTHH:MM:SS'
    const localDateString = localDate.toISOString().replace(/\.[0-9]{3}Z$/, ''); 

    return localDateString;
}
