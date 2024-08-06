interface User {
    name: string;
    email: string;
    nickname: string;
    profileImage: string;
    totalPoint:number;
    id:string;
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