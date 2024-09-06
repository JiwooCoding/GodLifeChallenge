import { IChallengeHistory } from '../../../../type/challengeData'
import ParticipationButton from '../participationChallenge-button/participationButton/ParticipationButton'


const ParticipationItem = ({item}:{item:IChallengeHistory}) => {
    return (
        <li>
            {item.mainImage}
            {item.title}
            {item.startDate} - {item.endDate}
            {item.uploadStartTime} - {item.uploadEndTime}

            <ParticipationButton 
                challengeId={item.id}
                startDate={item.startDate}
                endDate={item.endDate}
                startTime={item.uploadStartTime}
                endTime={item.uploadEndTime}
            />
        </li>
    )
}

export default ParticipationItem