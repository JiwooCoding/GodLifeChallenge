import { useEffect, useState } from 'react'
import styles from './DonationList.module.scss'
import api from '../../../../../api/api'
import { IDonationPoint } from '../../../../../type/IDonationPoint';
import usePagination from '../../../../../hooks/usePagination';
import DonationItem from './donation-item/DonationItem';
import Loading from '../../../../../components/loading/Loading';
import Pagination from '../../../../../components/pagination/Pagination';

const DonationList = () => {

  const [donationList, setDonationList] = useState<IDonationPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [itemsPerPage] = useState(10);
  const pageCount = Math.ceil(donationList.length / itemsPerPage);

  const {currentPage, handlePageClick} = usePagination();

  useEffect(() => {
    const fetchDonationData = async() => {
      try {
        const response = await api.get<IDonationPoint[]>('/api/points/donation-record');
        const data = response.data;
        setDonationList(data);
      } catch (error) {
        console.log('기부내역 받아오기 에러',error)
      }finally{
        setLoading(false);
      }
    }

    fetchDonationData();
  }, [])
  
  const currentDonation = donationList.slice(currentPage * itemsPerPage, (currentPage +1 ) * itemsPerPage);

  return (
    <>
      <div className={styles.donation_header}>
          <div className={styles.donation_date}>날짜</div>
          <div className={styles.donation_description}>내역</div>
          <div className={styles.donation_points}>포인트</div>
      </div>
      {loading ? (
        <Loading/>
      ) : currentDonation.length > 0 ? (
        <>
          <ul>
            {currentDonation.map((donation, index) => (
              <DonationItem
                key={index}
                item={donation}
              />
            ))}
          </ul>
          <Pagination
            pageCount={pageCount}
            handlePageClick={handlePageClick}
          />
        </>
      ): (
        <div className={styles.noDonation}>기부 내역이 없습니다</div>
      )}
    </>
  )
}

export default DonationList