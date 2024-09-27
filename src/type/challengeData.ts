export type UserChallengeRecord = {
    id:string;
    mainImage:string;
    title:string;
    startDate:string;
    endDate:string;
    uploadStartTime:string;
    uploadEndTime:string;
    authCount?:number;
    progress?:number;
    prize:number;
    deposit:number;
    checkRecords?:{
        checkDate:string;
        imageUrl:string;
        status:string;
        description:string;
        postId:string;
        userName:string;
    }[];
}

export type UserAuthImages = {
    checkDate:string;
    imageUrl:string;
    status:string;
    description:string;
    postId:string;
    userName:string;
}[];

export type FormValues = {
    title: string; //챌린지 제목
    category: string; // 챌린지 카테고리
    startDate: string; // 챌린지 시작일 (당일x, 다음날부터 가능)
    endDate:string;// 챌린지 종료일
    uploadStartTime:string;
    uploadEndTime:string;
    authMethod:string; //인증방법
    participantsLimit:number; //참여인원
    description: string; //챌린지 설명
    mainImage: FileList; //메인이미지
    successImage:FileList; //예시 성공 인증샷
    failImage:FileList; //예시 실패 인증샷
}


export type Participant = {
    userId:string;
    name:string;
}

export type Participants = Participant[];

export type UserHistory = {
    challengeId:string;
    changeDate:string;
    point:number;
    reason:string;
    title:string;
    status:string;
}

export type UserHistories = UserHistory[]