import { IChallenge } from '../../../../type/IChallenge'
import styles from './ChallengeItem.module.scss'
import { IoMdPerson } from "react-icons/io";
import { calculatorDday } from '../../../../utils/calculatorDday';
import { useNavigate } from 'react-router-dom';

interface ChallengeItemProps {
  item:IChallenge;
}

const ChallengeItem = ({item}:ChallengeItemProps) => {

  const navigate = useNavigate();

  const diffDays = calculatorDday(item.startDate, item.endDate);

  const handleClick = () => {
    navigate(`/challenge/${item.challengeId}`);
  }


  return (
    <li className={styles.challenge_item} onClick={handleClick}>
      <img src={item.mainImage} alt='challenge image'/>
      <div className={styles.challenge_title}>
        <h2>{item.title}</h2>
        <div className={styles.challenge_participantInfo}>
          <IoMdPerson size={15} style={{color:'rgb(127 127 127)'}}/>
          <p>{item.participants}명</p>
        </div>
      </div>
      <span className={styles.state}>{item.state}</span>
      <div className={styles.challenge_period}>
        <span>매일</span>
        <span>{diffDays}일 동안</span>
      </div>
    </li>
  )
}

export default ChallengeItem