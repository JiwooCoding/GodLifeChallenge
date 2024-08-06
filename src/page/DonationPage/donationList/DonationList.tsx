import styles from './DonationList.module.scss';
import { donationData } from '../../../data/donationData';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../../../api/api';


const DonationList = () => {

  const [goal, setGoal] = useState(100000); //목표금액
  const [currentAmount, setCurrentAmount] = useState(0); //현재금액
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const fetchDataAndCheckGoal = async() => {
      try {
        const response = await api.get('/api/donation');
        const amount = response.data.amount;
        setCurrentAmount(amount);
        if(amount >= goal){
          setFinished(true);
        }
      } catch (error) {
        console.log('서버에서 기부 총 금액 가져오기 실패', error);
      }
    }

    fetchDataAndCheckGoal();
  }, [goal]);
  

  return (
    <ul className={styles.donation_list}>
      {donationData.map(donation => (
        <>
          <li 
            key={donation.id} 
            className={`${styles.donation_item} ${finished === true ? styles.finished : ''}`} 
            style={{ backgroundImage: `url(${donation.imageUrl})` }}
          >
            <span className={styles.title}>{donation.name}</span>
            <div className={styles.donation_area}>
              <div className={styles.current}>
                <span className={styles.current_title}>모인금액</span>
                <span className={styles.current_amount}>{currentAmount.toLocaleString()}</span>
              </div>
              <div className={styles.goal}>
                <span className={styles.goal_title}>목표금액</span>
                <span className={styles.goal_amount}>{goal.toLocaleString()}</span>
              </div>
              <Link to={'/donation-detail'}><button className={styles.donation_btn}>기부 동참하기</button></Link>
            </div>
          </li>
        </>
      ))}
    </ul>
  );
};

export default DonationList;
