export type IChallenge = {
    id:string;
    title:string;
    category:string;
    startDate:string;
    endDate:string;
    uploadStartTime:string;
    uploadEndTime:string;
    state:string;
    mainImage:string;
    successImage:string;
    failImage:string;
    participantsLimit:number;
    participants:number;
    isJoined:boolean;
    authMethod:string;
}