import { useEffect, useState } from 'react';
import api from '../../../api/api';
import RegisterChallengeItem from './registerChallenge-item/RegisterChallengeItem';
import Loading from '../../../components/loading/Loading';
import noChallenge from '../../../image/challenge/noChallengeHistory.png'
import styles from './RegisterChallengeList.module.scss'
import { IChallenge } from '../../../type/IChallenge';

interface RegisterChallengeListProps{
    state: string;
}

const RegisterChallengeList = ({state}:RegisterChallengeListProps) => {

    const [challenges, setChallenges] = useState<IChallenge[]>([]);
    const [filteredChallenges, setFilteredChallenges] = useState<IChallenge[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRegisterChallenges = async () => {
            try {
                const response = await api.get(`/api/challenge/applied`,{
                    params:{
                        state:state === '전체' ? null : state
                    }
                });
                setChallenges(response.data);
            } catch (error) {
                console.log('챌린지 업로드 데이터를 가져올 수 없습니다!', error);
            } finally {
                setLoading(false); 
            }
        };

        fetchRegisterChallenges();
    }, []);

    useEffect(() => {
        const filterChallengStatus = () => {
            const filtered = challenges.filter(challenge => {
                const statusMatch = state === '전체' || challenge.state === state;

                return statusMatch;
            });
            setFilteredChallenges(filtered);
        }
        filterChallengStatus();
    }, [challenges, state])

    return (
        <>
            {loading ? (
                <Loading/>
            ) : filteredChallenges.length > 0 ? (
            <ul>
                {filteredChallenges.map(challenge => (
                    <RegisterChallengeItem
                        key={challenge.id}
                        item={challenge}
                    />
                ))}
            </ul>
            ) : (
                <div className={styles.noChallenge}>
                    <img src={noChallenge} alt="no register challenge"/>
                </div>
            )}
        </>
    );
}

export default RegisterChallengeList;
