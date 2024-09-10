import { useEffect, useState } from 'react';
import api from '../../../api/api';
import RegisterChallengeItem from './registerChallenge-item/RegisterChallengeItem';
import { IChallengeHistory } from '../../../type/challengeData';
import Loading from '../../../components/loading/Loading';
import noChallenge from '../../../image/challenge/noChallengeHistory (1).png'
import styles from './RegisterChallengeList.module.scss'

const RegisterChallengeList = () => {
    const [challenges, setChallenges] = useState<IChallengeHistory[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRegisterChallenges = async () => {
            try {
                const response = await api.get(`/api/challenge/register`);
                setChallenges(response.data);
            } catch (error) {
                console.log('챌린지 업로드 데이터를 가져올 수 없습니다!', error);
            } finally {
                setLoading(false); 
            }
        };

        fetchRegisterChallenges();
    }, []);

    return (
        <>
            {loading ? (
                <Loading/>
            ) : challenges.length > 0 ? (
            <ul>
                {challenges.map(challenge => (
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
