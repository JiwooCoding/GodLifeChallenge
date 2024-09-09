import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import api from '../../../api/api';
import RegisterChallengeItem from './registerChallenge-item/RegisterChallengeItem';
import { IChallengeHistory } from '../../../type/challengeData';

type RouteParams = {
    userId?:string;
}

const RegisterChallengeList = () => {
    const {userId} = useParams<RouteParams>();
    const [challenges, setChallenges] = useState<IChallengeHistory[]>([]);

    useEffect(() => {
        const fetchRegisterChallenges = async() => {
            try {
                if(userId){
                    const response = await api.get(`/api/user/${userId}/challenges/register`);
                    setChallenges(response.data);
                }else{
                    console.log('userId가 없습니다')
                }
            } catch (error) {
                console.log('챌린지 업로드 데이터를 가져올 수 없습니다!',error);
            }
        };

        fetchRegisterChallenges();
    }, [userId]);
    
    return (
        <div>
            {challenges.length > 0 ? (
                <ul>
                    {challenges.map(challenge => (
                        <RegisterChallengeItem
                            key={challenge.id}
                            item={challenge}
                        />
                    ))}
                </ul>
            ) : (
                <p>등록된 챌린지가 없습니다</p>
            )}
        </div>
    )
}

export default RegisterChallengeList