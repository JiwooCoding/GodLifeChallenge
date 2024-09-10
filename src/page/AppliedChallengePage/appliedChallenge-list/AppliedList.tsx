import { useEffect, useState } from "react";
import { IChallengeHistory } from "../../../type/challengeData";
import api from "../../../api/api";
import AppliedItem from "./appliedChallenge-item/AppliedItem";
import Loading from "../../../components/loading/Loading";

const AppliedList = () => {

    const [challenges, setChallenges] = useState<IChallengeHistory[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchParticipationChallenges = async() => {
            try {
                const response = await api.get(`/api/challenge/applied`);
                setChallenges(response.data);
            } catch (error) {
                console.log('챌린지 참여 내역 데이터 가져오기 실패!!',error);
            } finally{
                setLoading(false);
            }
        };

        fetchParticipationChallenges();
    }, []);
    

    return (
        <>
            {loading ? (
                <Loading/>
            ) : challenges.length > 0 ? (
                <ul>
                    {challenges.map(challenge => (
                        <AppliedItem
                            key={challenge.id}
                            item={challenge}
                        />
                    ))}
                </ul>
            ): (
                <p>참여한 챌린지가 없습니다</p>
            )}
        </>
    )
}

export default AppliedList