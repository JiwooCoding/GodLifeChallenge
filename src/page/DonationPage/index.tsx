import { useState } from 'react';
import donation from '../../image/donation/Make a Difference with Your Donation! (5).png'
import DonationList from './donationList/DonationList'
import styles from './donationList/DonationList.module.scss'

const Donation = () => {

  const [selectedDonationId, setSelectedDonationId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleDonationSelect = (id: string) => {
    setSelectedDonationId(id);
    setModalOpen(true);
  };


  return (
    <div className='inner'>
        <div className={styles.donation_introduce}>
            <div>
                <img src={donation} alt='donation-info' style={{borderRadius:'10px', position:'relative'}}/>
                <button className={styles.donation_button}>나의 기부 현황</button>
            </div>
            <div>
              {/* 변경된 prop 이름 사용 */}
              <DonationList onSelectDonation={handleDonationSelect}/>
            </div>
        </div>
    </div>
  )
}

export default Donation;
