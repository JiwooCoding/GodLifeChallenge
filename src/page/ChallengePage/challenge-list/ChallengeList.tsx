import React, { useEffect, useState } from 'react'
import api from '../../../api/api'
import { IChallenge } from '../../../type/IChallenge';
import ChallengeItem from './challenge-item/ChallengeItem';

interface ChallengeListProps{
    category:string;
    state:string;
}

const ChallengeList = ({category, state}:ChallengeListProps) => {

    const [challengeData, setChallengeData] = useState<IChallenge[]>([]);

    useEffect(() => {
        const fetchChallenges = async() => {
            try {
                const response = await api.get('/api/challenge',{
                    params:{
                        category:category,
                        state:state
                    }
                })
                setChallengeData(response.data);
            } catch (error) {
                console.log('챌린지 데이터 받아오기 실패',error);
            }
        }

        fetchChallenges();
    }, [category, state]);
    

    return (
        <div>
            {challengeData.length === 0 ? (
                <p>등록된 챌린지가 없습니다!</p>
            ) : (
                <ul>
                    {challengeData.map(challenge => (
                        <ChallengeItem
                            key={challenge.id}
                            item={challenge}
                        />
                    ))}
                </ul>
            )}
        </div>
    )
}

export default ChallengeList