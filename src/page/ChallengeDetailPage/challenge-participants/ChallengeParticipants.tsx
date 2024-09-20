import { useEffect, useState } from "react"
import api from "../../../api/api";
import { Participants } from "../../../type/challengeData";
import styles from './ChallengeParticipants.module.scss'

const ChallengeParticipants = ({challengeId}:{challengeId?:string}) => {

    const [participants, setParticipants] = useState<Participants>([]);

    useEffect(() => {
        const fetchParticipants = async() => {
            try {
                const response = await api.get(`/api/challenge/${challengeId}/participants`);
                setParticipants(response.data);
                console.log(response.data);
            } catch (error) {
                console.log('참여자 리스트 가져오기 실패!', error);
            }
        }

        fetchParticipants();
    }, []);
    

    return (
        <div>
            {participants.map(participant => (
                <div className={styles.participants_list} key={participant.userId}>
                    <span>{participant.name}</span>
                </div>
            ))}
        </div>
    )
}

export default ChallengeParticipants