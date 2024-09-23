import { useState } from "react";
import RegisterChallengeList from "./registerChallenge-list/RegisterChallengeList"
import styles from './ReigsterChallengesPage.module.scss'
import SelectOption from "../../components/selectOption/SelectOption";

const ReigsterChallengesPage = () => {

    const [selectedStatus, setSelectedStatus] = useState('전체');

    const handleStatusChange = (status:string) => {
        setSelectedStatus(status);
    }

    return (
        <div>
            <div className={styles.titleAndFilter}>
                <h1>개설 챌린지 내역</h1>
                <SelectOption
                    selectedStatus={selectedStatus}
                    onStatusChange={handleStatusChange}
                />
            </div>
            <RegisterChallengeList
                state={selectedStatus}
            />
        </div>
    )
}

export default ReigsterChallengesPage