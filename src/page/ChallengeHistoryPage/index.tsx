import AppliedChallengePage from '../AppliedChallengePage'
import ReigsterChallengesPage from '../RegisteredChallengesPage/ReigsterChallengesPage'

const ChallengeHistoryPage = () => {
    return (
        <div className='page'>
            <h1>개설한 챌린지</h1>
            <ReigsterChallengesPage/>
            <br/>
            <h1>참여한 챌린지</h1>
            <AppliedChallengePage/>
        </div>
    )
}

export default ChallengeHistoryPage