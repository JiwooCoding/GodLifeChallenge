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
    navigate(`/challenge/${item.id}`);
  }

  const changeText = (state:string, limited:boolean) => {
    if(item.state === "진행전" && item.isLimited === true){
      return '모집마감'
    }
    if(item.state === "진행전" && item.isLimited === false){
      return '챌린지 인원 모집중'
    }
  }


  return (
    <>
    <li className={`${item.state === '종료' ? `${styles.challenge_item} ${styles.status_fin}` : styles.challenge_item}`} onClick={handleClick}>
      <img src={item.mainImage} alt='challenge image'/>
      <div className={`${item.state === '진행전' ? styles.status_availableJoin : ''}`}>
        {changeText(item.state, item.isLimited)}
      </div>
      <div className={styles.challenge_title}>
        <h2>{item.title}</h2>
        <div className={styles.challenge_participantInfo}>
          <IoMdPerson size={15} style={{color:'rgb(127 127 127)'}}/>
          <p>{item.participants}명</p>
        </div>
      </div>
      <span className={`${item.state === '진행중' ? `${styles.state}` : ''}`}>{item.state === '진행중' && item.state}</span>
      <div className={styles.challenge_period}>
        <span>매일</span>
        <span>{diffDays === 0 ? '하루' : `${diffDays+1}일 `}동안</span>
      </div>
    </li>
    </>
  )
}

export default ChallengeItem