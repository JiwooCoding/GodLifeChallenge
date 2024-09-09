import styles from './DonationList.module.scss';
import { donationData } from '../../../data/donationData';
import { Link } from 'react-router-dom';
import useDonationData from '../../../hooks/useDonationData';

interface DonationListProps {
  onSelectDonation: (id:string) => void;
}

const DonationList = ({onSelectDonation}:DonationListProps) => {

  const {donationAmounts, finished, goal} = useDonationData();

  const handleSelectDonation = (id: string) => {
    onSelectDonation(id);
    localStorage.setItem('selectedDonationId', id);
  };
  

  return (
    <ul className={styles.donation_list}>
      {donationData.map((donation) => (
          <li 
            key={donation.id} 
            onClick={() => handleSelectDonation(donation.id)}
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
