import { useState } from "react";
import RegisterChallengeList from "./registerChallenge-list/RegisterChallengeList"
import RegiChallengeStatus from "./registerChallenge-status/RegiChallengeStatus";
import styles from './ReigsterChallengesPage.module.scss'

const ReigsterChallengesPage = () => {

    const [selectedStatus, setSelectedStatus] = useState('전체');

    const handleStatusChange = (status:string) => {
        setSelectedStatus(status);
    }

    return (
        <div>
            <div className={styles.titleAndFilter}>
                <h1>개설 챌린지 내역</h1>
                <RegiChallengeStatus
                    selectedStatus={selectedStatus}
                    onStatusChange={handleStatusChange}
                />
            </div>
            <RegisterChallengeList/>
        </div>
    )
}

export default ReigsterChallengesPage