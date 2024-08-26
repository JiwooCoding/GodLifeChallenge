import styles from './DonationList.module.scss';
import { donationData } from '../../../data/donationData';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../../../api/api';

type DonationType = {
  id:string;
  name:string;
  imageUrl:string;
  link?:string;
}

interface DonationListProps {
  onSelectDonation: (id:string) => void;
}

const DonationList = ({onSelectDonation}:DonationListProps) => {

  const [donationAmounts, setDonationAmounts] = useState<{ [key: string]: number }>({});
  const [goal, setGoal] = useState(1000); // 목표금액
  const [finished, setFinished] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const fetchDataAndCheckGoal = async() => {
      try {
        const updatedDonationAmounts: { [key: string]: number } = {};
        const updatedFinished: { [key: string]: boolean } = {};

        for (const donation of donationData) {
          const response = await api.get(`/api/donation/view/${donation.id}`);
          const amount = response.data.amount;
          updatedDonationAmounts[donation.id] = amount;
          updatedFinished[donation.id] = amount >= goal;
        }

        setDonationAmounts(updatedDonationAmounts);
        setFinished(updatedFinished);

      } catch (error) {
        console.log('서버에서 기부 총 금액 가져오기 실패', error);
      }
    }

    fetchDataAndCheckGoal();
  }, [goal]);
  

  return (
    <ul className={styles.donation_list}>
      {donationData.map((donation) => (
          <li 
            key={donation.id} 
            onClick={() => onSelectDonation(donation.id)} // 기부 대상 클릭 시 ID 저장
            className={`${styles.donation_item} ${finished[donation.id] === true ? styles.finished : ''}`} 
            style={{ backgroundImage: `url(${donation.imageUrl})` }}
          >
            <span className={styles.title}>{donation.name}</span>
            <div className={styles.donation_area}>
              <div className={styles.current}>
                <span className={styles.current_title}>모인금액</span>
                <span className={styles.current_amount}>{(donationAmounts[donation.id] || 0).toLocaleString()}</span>
              </div>
              <div className={styles.goal}>
                <span className={styles.goal_title}>목표금액</span>
                <span className={styles.goal_amount}>{goal.toLocaleString()}</span>
              </div>
              <Link to={'/donation-detail'}><button className={styles.donation_btn}>기부 동참하기</button></Link>
            </div>
          </li>
      ))}
    </ul>
  );
};

export default DonationList;
