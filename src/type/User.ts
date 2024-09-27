interface User {
    name: string;
    email: string;
    nickname: string;
    profileImage: string;
    totalPoint:number;
    id:string;
    challengeStats?:{
        createdChallenges:number;
        endChallenges:number;
        ongoingChallenges:number;
        userTotalPrize:number;
    };
}

interface ProfileImageUploadData {
    profileImage: FileList;
}

interface RegisterFormData {
    email: string;
    userName: string;
    nickname: string;
    password: string;
    passwordConfirm: string;
    profileImage?: FileList; 
}

interface LoginFormData {
    email:string;
    password:string;
}