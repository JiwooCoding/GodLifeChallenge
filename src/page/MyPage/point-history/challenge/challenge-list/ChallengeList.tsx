import { useEffect, useState } from 'react'
import styles from  './ChallengeList.module.scss'
import api from '../../../../../api/api'
import Loading from '../../../../../components/loading/Loading';
import { UserHistories, UserHistory } from '../../../../../type/challengeData';
import usePagination from '../../../../../hooks/usePagination';
import ChallengeItem from './challenge-item/ChallengeItem';
import Pagination from '../../../../../components/pagination/Pagination';

const ChallengeList = () => {
    const [history, setHistory] = useState<UserHistories>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [itemsPerPage, setItemsPerPage] = useState(10);//한 페이지당 갯수
    const [totalPages, setTotalPages] = useState(0); // 전체 페이지 수
    const {currentPage, handlePageClick} = usePagination();

    useEffect(() => {
        const fetchHistory = async() => {
            try {
                const response = await api.get(`/api/challenge/applied`,{
                    params:{
                        page:currentPage,
                        size:itemsPerPage
                    }
                });
                setHistory(response.data.content);
                setTotalPages(response.data.totalPages); // 전체 페이지 수
                setItemsPerPage(response.data.size); //한 페이지당 갯수
            } catch (error) {
                console.log('챌린지 히스토리 가져오기 실패',error);
            } finally{
                setIsLoading(false);
            }
        }

        fetchHistory();
    }, [currentPage, itemsPerPage]);

    return (
        <div>
            <div className={styles.history_header}>
                <div className={styles.history_date}>날짜</div>
                <div className={styles.history_description}>챌린지</div>
                <div className={styles.history_status}>상태</div>
                <div className={styles.history_points}>포인트</div>
            </div>
            {isLoading ? (
                <Loading />
            ) : history.length > 0 ? (
                <>
                <ul className={styles.history_list}>
                    {history.map((historyItem: UserHistory, index) => (
                        <ChallengeItem
                            key={index}
                            item={historyItem}
                        />
                    ))}
                </ul>
                <Pagination
                    pageCount={totalPages}
                    handlePageClick={handlePageClick}
                />
                </>
            ) : (
                <div>히스토리가 없습니다.</div>
            )}
        </div>
    );
}

export default ChallengeList;