import { UserAuthImages } from "../type/challengeData";

export const countHelper = (authResult:UserAuthImages) => {
    if(!authResult){
        return [0,0];
    }

    return authResult.reduce(
        (acc, record) => {
            if(record.status === '인증') acc[0] += 1;
            if(record.status === '인증실패') acc[1] += 1;
            return acc;
        },
        [0,0]
    );
};