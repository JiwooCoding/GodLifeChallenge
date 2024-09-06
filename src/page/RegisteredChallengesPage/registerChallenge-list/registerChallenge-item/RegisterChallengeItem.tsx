import { IChallengeRegister } from '../../../../type/challengeData'

const RegisterChallengeItem = ({item}:{item:IChallengeRegister}) => {
    return (
        <li>
            {item.mainImage}
            {item.title}
            {item.startDate} - {item.endDate}
            {item.uploadStartTime} - {item.uploadEndTime}
        </li>
    )
}

export default RegisterChallengeItem