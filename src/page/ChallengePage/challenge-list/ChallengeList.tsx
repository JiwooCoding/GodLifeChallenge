import { useEffect, useState } from 'react'
import api from '../../../api/api'
import { IChallenge } from '../../../type/IChallenge';
import ChallengeItem from './challenge-item/ChallengeItem';
import styles from './ChallengeList.module.scss'
import noChallenge from '../../../image/challenge/noChallenge.png'
import Loading from '../../../components/loading/Loading';

interface ChallengeListProps{
    category: string;
    state: string;
}

const ChallengeList = ({ category, state }: ChallengeListProps) => {
    const [challengeData, setChallengeData] = useState<IChallenge[]>([]);
    const [filteredChallenges, setFilteredChallenges] = useState<IChallenge[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchChallenges = async() => {
            try {
                const response = await api.get('/api/challenge', {
                    params: {
                        category: category === '전체' ? null : category, 
                        state: state === '전체' ? null : state 
                    }
                });
                setChallengeData(response.data.content);
            } catch (error) {
                console.log('챌린지 데이터 받아오기 실패', error);
            } finally{
                setIsLoading(false);
            }
        };

        fetchChallenges();
    }, [category, state]);

    useEffect(() => {
        const filterChallenges = () => {
            const filtered = challengeData.filter(challenge => {
                const categoryMatch = category === '전체' || challenge.category === category;
                const stateMatch = state === '전체' || challenge.state === state;
                return categoryMatch && stateMatch;
            });
            setFilteredChallenges(filtered);
        };

        filterChallenges();
    }, [challengeData, category, state]);

    return (
        <>
        {isLoading ? (
                <Loading />
            ) : filteredChallenges.length === 0 ? (
                <div className={styles.noChallenge}>
                    <img src={noChallenge} alt='no challenge'/>
                </div>
            ) : (
                <ul className={styles.challenge_list}>
                    {filteredChallenges.map(challenge => (
                        <ChallengeItem
                            key={challenge.id}
                            item={challenge}
                        />
                    ))}
                </ul>
            )}
        </>
    );
};

export default ChallengeList;
