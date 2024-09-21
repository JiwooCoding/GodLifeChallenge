import { useState } from 'react';
import AppliedList from './appliedChallenge-list/AppliedList'
import styles from './index.module.scss'
import AppliedChallengeStatus from './appliedChallenge-status/AppliedChallengeStatus';

const AppliedChallengePage = () => {

    const [selectedStatus, setSelectedStatus] = useState('전체');

    const handleStatusChange = (status:string) => {
        setSelectedStatus(status);
    }

    console.log('현재 선택된 상태:', selectedStatus);

    return (
        <div className={styles.challengeList}>
            <div className={styles.titleAndFilter}>
                <h1>참여 챌린지 내역</h1>
                <AppliedChallengeStatus
                    selectedStatus={selectedStatus}
                    onStatusChange={handleStatusChange}
                />
            </div>
            <AppliedList
                state={selectedStatus}
            />
        </div>
    )
}

export default AppliedChallengePage