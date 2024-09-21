import { useEffect, useState } from 'react'
import api from '../../api/api'
import Loading from '../../components/loading/Loading';
import InProgressChallengItem from './inprogressChallenge-item/InProgressChallengItem';
import noChallenge from '../../image/challenge/noOngoingChallenge.png'
import { IChallenge } from '../../type/IChallenge';
import styles from './inprogressChallenge-item/InProgressChallengItem.module.scss'

const InProgressChallengePage = () => {

    const [challenges, setChallenges] = useState<IChallenge[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await api.get('/api/challenge/ongoing-challenge');
                console.log('진행중인 챌린지', response.data.content);
                setChallenges(response.data.content);
            } catch (error) {
                console.log(error);
            } finally{
                setIsLoading(false);
            }
        }

        fetchData();
    }, []);
    

    return (
        <div>
            <h1>진행중인 챌린지</h1>
            {isLoading ? (
                <Loading/>
            ) : (
                <>
                {challenges.length > 0 ? (
                    <ul>
                        {challenges.map(challenge => (
                            <InProgressChallengItem
                                key={challenge.id}
                                item={challenge}
                            />
                        ))}
                    </ul>
                ) : (
                    <div className={styles.noChallenge}>
                        <img src={noChallenge} alt='no Inprocess challenges'/>
                    </div>
                )}
                </>
            )}
        </div>
    )
}

export default InProgressChallengePage