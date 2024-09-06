import { useEffect, useState } from 'react'
import api from '../../../api/api'
import { IChallenge } from '../../../type/IChallenge';
import ChallengeItem from './challenge-item/ChallengeItem';
import styles from './ChallengeList.module.scss'
import noChallenge from '../../../image/challenge/noChallenge.png'

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
                console.log('dd===>',response.data); 
                setChallengeData(response.data.content);
            } catch (error) {
                console.log('챌린지 데이터 받아오기 실패',error);
            }
        }

        fetchChallenges();
    }, [category, state]);

    return (
        <>
            {challengeData.length === 0 ? (
                <div className={styles.noChallenge}>
                    <img src={noChallenge} alt='nochallenge'/>
                </div>
            ) : (
                <ul className={styles.challenge_list}>
                    {challengeData.map(challenge => (
                        <ChallengeItem
                            key={challenge.id}
                            item={challenge}
                        />
                    ))}
                </ul>
            )}
        </>
    )
}

export default ChallengeList