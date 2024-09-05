export function formatLocalDate(date: Date | null): string {
    if (!date) return '';
    
    const formattedDate = date.toISOString().split('T')[0]

    return formattedDate;
}
