export function formatLocalDate(date: Date | null): string {
    if (!date) return '';

    // 날짜를 UTC 기준으로 'yyyy-MM-dd' 형식으로 포맷
    const year = date.getUTCFullYear();
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작하므로 +1
    const day = date.getUTCDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
}
