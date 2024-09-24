import React, { useState } from 'react'
import api from '../../../../../api/api'
import ChallengeButton from '../../../../../components/button/challengeButton/ChallengeButton'


const ChallengeFinishButton = ({challengeId}:{challengeId:string}) => {

    const [disabled, setDisabled] = useState(false);

    const handleFinish = async() => {
        try {
            await api.post(`/api/user/challenge/admin/${challengeId}/close`);
            setDisabled(true);
        } catch (error) {
            console.log(challengeId);
            console.log('챌린지 종료버튼 오류',error)
        }
    }

    return (
        <ChallengeButton onClick={handleFinish} variant='finish' disabled={disabled}>
            {disabled ? '챌린지 종료' : '챌린지 종료하기'}
        </ChallengeButton>
    )
}

export default ChallengeFinishButton