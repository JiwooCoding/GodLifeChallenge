export type IChallenge = {
    challengeId:string;
    title:string;
    category:string;
    startDate:string;
    endDate:string;
    startTime:string;
    endTime:string;
    state:string;
    mainImage:string;
    successImage:string;
    failImage:string;
    participantsLimit:number;
    participants:number;
    isJoined:boolean;
    authMethod:string;
}