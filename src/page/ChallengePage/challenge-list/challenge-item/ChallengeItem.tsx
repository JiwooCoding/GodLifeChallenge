import React from 'react'
import { IChallenge } from '../../../../type/IChallenge'

interface ChallengeItemProps {
  item:IChallenge;
}

const ChallengeItem = ({item}:ChallengeItemProps) => {
  return (
    <li>
      {item.category}
    </li>
  )
}

export default ChallengeItem