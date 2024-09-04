export const calculatorDday = (startDateStr:string, endDateStr:string) => {
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);

    const diffTime = endDate.getTime() - startDate.getTime();
    
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}