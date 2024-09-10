import { useEffect, useState } from "react";
import api from "../../../api/api";
import AppliedItem from "./appliedChallenge-item/AppliedItem";
import Loading from "../../../components/loading/Loading";
import noChallenge from '../../../image/challenge/noChallengeHistory.png'
import styles from './AppliedList.module.scss'
import { IChallenge } from "../../../type/IChallenge";

interface AppliedListProps{
    state: string;
}


const AppliedList = ({state}:AppliedListProps) => {

    const [challenges, setChallenges] = useState<IChallenge[]>([]);
    const [filteredChallenges, setFilteredChallenges] = useState<IChallenge[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchParticipationChallenges = async() => {
            try {
                const response = await api.get(`/api/challenge/applied`,{
                    params:{
                        state:state === '전체' ? null : state
                    }
                });
                setChallenges(response.data);
            } catch (error) {
                console.log('챌린지 참여 내역 데이터 가져오기 실패!!',error);
            } finally{
                setLoading(false);
            }
        };

        fetchParticipationChallenges();
    }, [state]);
    

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
                        <AppliedItem
                            key={challenge.id}
                            item={challenge}
                        />
                    ))}
                </ul>
            ): (
                <div className={styles.noChallenge}>
                    <img src={noChallenge} alt="no apply challenge"/>
                </div>
            )}
        </>
    )
}

export default AppliedList