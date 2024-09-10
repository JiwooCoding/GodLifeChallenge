import { format, parseISO } from "date-fns"
import { ko } from "date-fns/locale";

//2024-09-08 => 9.08(화) 나타내기
export const formattedDate = (dateStr:string) => {
    const date = parseISO(dateStr);

    const formatDate = format(date, 'M.d', {locale:ko});
    const dayOfWeek = format(date, 'E', {locale:ko});

    return `${formatDate} (${dayOfWeek})`
}