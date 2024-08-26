import { useEffect, useState } from 'react'
import styles from './GiftList.module.scss'
import api from '../../../../../api/api'
import { IGiftPoint } from '../../../../../type/IGiftPoint';
import GiftItem from './gift-item/GiftItem';
import usePagination from '../../../../../hooks/usePagination';
import Pagination from '../../../../../components/pagination/Pagination';
import Loading from '../../../../../components/loading/Loading';

const GiftList = () => {

    const [giftList, setGiftList] = useState<IGiftPoint[]>([]);
    const [itemsPerPage] = useState(10);
    const [loading, setLoading] = useState(true);
    const pageCount = Math.ceil(giftList.length / itemsPerPage);
    const {currentPage, handlePageClick} = usePagination();

    useEffect(() => {
        const fetchPoint = async() => {
            try {
                const response = await api.get<IGiftPoint[]>('/api/points/gift-record');
                setGiftList(response.data);
            } catch (error) {
                console.log('포인트 선물 내역 받아오기 에러',error);
            } finally{
                setLoading(false);
            }
        }

        fetchPoint();
    }, []);

    const currentGift = giftList.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

    return (
        <>
            <div className={styles.gift_header}>
                <div className={styles.gift_date}>날짜</div>
                <div className={styles.gift_description}>내역</div>
                <div className={styles.gift_points}>포인트</div>
            </div>
            {loading ? (
                <Loading/>
            ) : currentGift.length > 0 ? (
                <>
                    <ul>
                    {currentGift.map((gift, index) => (
                        <GiftItem
                            key={index}
                            item={gift}
                        />
                    ))}
                    </ul>
                    <Pagination
                        pageCount={pageCount}
                        handlePageClick={handlePageClick}
                    />
                </>
            ) : (
                <div className={styles.noGift}>포인트 선물 내역이 없습니다</div>
            )}
            
        </>
    )
}

export default GiftList