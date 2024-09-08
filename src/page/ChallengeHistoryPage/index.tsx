import ParticipationChallengePage from '../ParticipationChallengePage'
import ReigsterChallengesPage from '../RegisteredChallengesPage/ReigsterChallengesPage'

const ChallengeHistoryPage = () => {
    return (
        <div className='page'>
            <h1>등록한 챌린지</h1>
            <ReigsterChallengesPage/>
            <br/>
            <h1>참여한 챌린지</h1>
            <ParticipationChallengePage/>
        </div>
    )
}

export default ChallengeHistoryPage