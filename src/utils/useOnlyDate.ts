import { format } from "date-fns";

export const useOnlyDate = (dateStr:string | undefined) => {
    if(!dateStr) return '';
    
    const date = new Date(dateStr);
    return format(date, 'MM.dd');
}