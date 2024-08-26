export interface IEventData {
    id: number;
    imageUrl: string;
    title: string;
    description: string;
    startDate: Date;
    endDate:Date;
    path:string;
}

export interface IEventHistoryData {
    type:string;
    description:string;
    points:number;
    createdAt:string;
}