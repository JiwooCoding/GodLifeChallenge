interface User {
    name: string;
    email: string;
    nickname: string;
    profileImage: string;
    totalPoint:number;
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