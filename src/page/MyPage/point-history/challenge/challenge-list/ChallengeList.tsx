import { useEffect, useState } from 'react'
import styles from  './ChallengeList.module.scss'
import api from '../../../../../api/api'
import Loading from '../../../../../components/loading/Loading';
import { UserHistories, UserHistory } from '../../../../../type/challengeData';
import usePagination from '../../../../../hooks/usePagination';
import ChallengeItem from './challenge-item/ChallengeItem';

const ChallengeList = () => {
    const [history, setHistory] = useState<UserHistories>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [itemsPerPage] = useState(10);
    const pageCount = Math.ceil(history.length / itemsPerPage);
    const {currentPage, handlePageClick} = usePagination();

    useEffect(() => {
        const fetchHistory = async() => {
            try {
                const response = await api.get('/api/challenge/applied');
                setHistory(response.data.content);
            } catch (error) {
                console.log('챌린지 히스토리 가져오기 실패',error);
            } finally{
                setIsLoading(false);
            }
        }

        fetchHistory();
    }, []);

    // 페이지별로 보여줄 히스토리 목록을 계산
    const currentHistories = history.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

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
            ) : currentHistories.length > 0 ? (
                <ul className={styles.history_list}>
                    {currentHistories.map((historyItem: UserHistory, index) => (
                        <ChallengeItem
                            key={index}
                            item={historyItem}
                        />
                    ))}
                </ul>
            ) : (
                <div>히스토리가 없습니다.</div>
            )}
        </div>
    );
}

export default ChallengeList;