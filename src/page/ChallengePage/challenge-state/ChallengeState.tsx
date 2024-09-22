import React from 'react'
import styles from './ChallengeState.module.scss'

interface ChallengeStateProps {
    selectedState:string;
    onStateChange:(state:string) => void;
}

const ChallengeState = ({selectedState, onStateChange}:ChallengeStateProps) => {
    
    const handleStateChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
        onStateChange(e.target.value);
    }
    
    return (
        <div>
            <select
                className={styles.selectbox}
                value={selectedState}
                onChange={handleStateChange}
            >
                <option value='전체'>전체</option>
                <option value='진행전'>진행전</option>
                <option value='진행중'>진행중</option>
                <option value='모집마감'>모집마감</option>
                <option value='종료'>종료</option>
            </select>
        </div>
    )
}

export default ChallengeState