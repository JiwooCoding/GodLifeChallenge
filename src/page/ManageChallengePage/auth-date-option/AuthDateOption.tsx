import { UserChallengeRecord } from '../../../type/challengeData'
import { dateArray } from '../../../utils/dateArray';
import styles from './AuthDateOption.module.scss'

interface AuthDateOptionProps {
    selectedStatus:string;
    onStatusChange:(state:string) => void;
    item:UserChallengeRecord | null;
}

const AuthDateOption = ({item, onStatusChange, selectedStatus}:AuthDateOptionProps) => {

    const dates = dateArray(item?.startDate!);

    const handleStateChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
        onStatusChange(e.target.value);
    }

    return (
        <div className={styles.option_container}>
            <select
                value={selectedStatus}
                onChange={handleStateChange}
                className={styles.selectbox}
            >
                {dates.map((date, index) => (
                    <option key={index} value={date}>
                        {date}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default AuthDateOption