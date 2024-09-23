import { UserChallengeRecord } from '../../../type/challengeData'
import { dateArray } from '../../../utils/dateArray';

const AuthDateOption = ({item}:{item:UserChallengeRecord | null}) => {

    //dateArray 사용하면 됨!
    const startDate = '2024-09-21';
    const dates = dateArray(item?.startDate!);


    return (
        <div>
            <select>
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