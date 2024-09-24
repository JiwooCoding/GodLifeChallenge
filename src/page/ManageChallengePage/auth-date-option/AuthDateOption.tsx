import { UserChallengeRecord } from '../../../type/challengeData'
import { dateArray } from '../../../utils/dateArray';

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
        <div>
            <select
                value={selectedStatus}
                onChange={handleStateChange}
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