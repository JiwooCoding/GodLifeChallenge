export type IChallenge = {
    id:string;
    title:string;
    category:string;
    startDate:string;
    endDate:string;
    state:string;
    mainImage:string;
    participantsLimit:number;
    participants:number;
    isJoined:boolean;
}