import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { IChallengeHistory } from "../../../type/challengeData";
import api from "../../../api/api";
import ParticipationItem from "./appliedChallenge-item/AppliedItem";
import { challenges } from "../../../data/challengeData";

type RouteParams = {
    userId:string;
}

const ParticipationList = () => {

    const {userId} = useParams<RouteParams>();
    //const [challenges, setChallenges] = useState<IChallengeHistory[]>([]);

    // useEffect(() => {
    //     const fetchParticipationChallenges = async() => {
    //         try {
    //             if(userId){
    //                 const response = await api.get(`/api/user/${userId}/challenges/applied`);
    //                 setChallenges(response.data.appliedChallenges);
    //             }else{
    //                 console.log('userId를 찾을 수 없습니다!');
    //             }
    //         } catch (error) {
    //             console.log('챌린지 참여 내역 데이터 가져오기 실패!!',error);
    //         }
    //     };

    //     fetchParticipationChallenges();
    // }, [userId]);
    

    return (
        <div>
            {challenges.length > 0 ? (
                <ul>
                    {challenges.map(challenge => (
                        <ParticipationItem
                            key={challenge.id}
                            item={challenge}
                        />
                    ))}
                </ul>
            ) : (  
                <div>
                    <p>챌린지 참여 내역이 없습니다</p>
                </div>
            )}
        </div>
    )
}

export default ParticipationList