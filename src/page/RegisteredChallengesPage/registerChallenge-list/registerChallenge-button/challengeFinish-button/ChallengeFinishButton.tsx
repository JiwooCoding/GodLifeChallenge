import { useState } from 'react'
import api from '../../../../../api/api'
import ChallengeButton from '../../../../../components/button/challengeButton/ChallengeButton'
import { IChallenge } from '../../../../../type/IChallenge';

interface FinishButtonprops {
    item:IChallenge;
    challengeId:string;
}

const ChallengeFinishButton = ({challengeId, item}:FinishButtonprops) => {


    const handleFinish = async() => {
        try {
            await api.post(`/api/user/challenge/admin/${challengeId}/close`);
        } catch (error) {
            console.log(challengeId);
            console.log('챌린지 종료버튼 오류',error);
        }
    }
    

    const trueOrFalse = item.state === '종료' ? true : false;
    

    return (
        <ChallengeButton onClick={handleFinish} variant='finish' disabled={trueOrFalse}>
            {item.state === '종료' ? '종료된 챌린지' : '챌린지 종료하기'}
        </ChallengeButton>
    )
}

export default ChallengeFinishButton