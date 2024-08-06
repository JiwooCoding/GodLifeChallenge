import donation from '../../image/donation/Make a Difference with Your Donation! (5).png'
import DonationList from './donationList/DonationList'
import styles from './donationList/DonationList.module.scss'

const Donation = () => {
  return (
    <div className='inner'>
        <div className={styles.donation_introduce}>
            {/* <h1>포인트스마일 기부 소개</h1> */}
            <div>
                <img src={donation} alt='donation-info' style={{borderRadius:'10px', position:'relative'}}/>
                <button className={styles.donation_button}>나의 기부 현황</button>
            </div>
            <div>
              <DonationList/>
            </div>
        </div>
    </div>
  )
}

export default Donation