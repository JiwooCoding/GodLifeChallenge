type CheckRecords = {
    checkDate:Date;
    image:string;
    status:string;
    description:string;
}

export type IUserAuth = {
    id:string;
    mainImage:string;
    title:string;
    startDate:string;
    endDate:string;
    uploadStartTime:string;
    uploadEndTime:string;
    progress:number;
    checkRecords:CheckRecords[];
    earnedPrize?:number;
    participationPoints:number;
}
