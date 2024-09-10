import React from 'react'
import styles from './RegiChallengeStatus.module.scss'

interface StatusProps {
    selectedStatus:string;
    onStatusChange:(state:string) => void;
}

const RegiChallengeStatus = ({selectedStatus,onStatusChange}:StatusProps) => {
    
    const handleStateChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
        onStatusChange(e.target.value);
    }
    
    return (
        <div>
            <select
                className={styles.selectbox}
                value={selectedStatus}
                onChange={handleStateChange}
            >
                <option value='전체'>전체</option>
                <option value='진행중'>진행중</option>
                <option value='모집전'>진행전</option>
                <option value='종료'>종료</option>
            </select>
        </div>
    )
}

export default RegiChallengeStatus