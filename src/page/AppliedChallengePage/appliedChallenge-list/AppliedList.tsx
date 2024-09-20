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
    const [hasCheckedIn, setHasCheckedIn] = useState(false);

    useEffect(() => {
        const fetchParticipationChallenges = async() => {
            try {
                const response = await api.get(`/api/user/challenge/participating`,{
                    params:{
                        state:state === '전체' ? null : state
                    }
                });
                console.log('진행중 챌린지', response.data.content);
                setChallenges(response.data.content);
                setHasCheckedIn(response.data.content.hasCheckedInToday); //서버에서 가져온 인증여부

                if(hasCheckedIn === true){
                    setHasCheckedIn(true);
                }

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
                            hasCheckedIn={hasCheckedIn}
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