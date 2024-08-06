import { format } from "date-fns"
import { ko } from "date-fns/locale"

export const formatDate = (date:Date) => {
    return format(date, 'yyyy년 MM월 dd일 EEEE',{locale:ko})
}

