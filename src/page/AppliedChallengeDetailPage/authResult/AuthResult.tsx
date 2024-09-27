import { useEffect, useState } from 'react'
import { UserAuthImages } from '../../../type/challengeData';
import api from '../../../api/api';
import { countHelper } from '../../../utils/countHelper';

const AuthResult = ({userChallengeId}:{userChallengeId:string | undefined}) => {

    const [authResult, setAuthResult] = useState<UserAuthImages>([]);
    const [countSuccess, countFail] = authResult ? countHelper(authResult) : [0, 0];
    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await api.get(`/api/challenge/${userChallengeId}/check-records`);
                console.log('유저인증샷',response.data.content);
                setAuthResult(response.data.content);
            } catch (error) {
                console.log('유저 인증 사진 가져오기 실패',error);
            }
        }

        fetchData();
    }, [])

    return (
            <>
                <div>
                    <span>인증성공</span>
                    <span>{countSuccess}회</span>
                </div>
                <div>
                    <span>인증실패</span>
                    <span>{countFail}회</span>
                </div>
            </>
    )
}

export default AuthResult