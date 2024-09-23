import { useEffect, useState } from 'react'
import api from '../../api/api'
import Loading from '../../components/loading/Loading';
import InProgressChallengItem from './inprogressChallenge-item/InProgressChallengItem';
import noChallenge from '../../image/challenge/noOngoingChallenge.png'
import { IChallenge } from '../../type/IChallenge';
import styles from './inprogressChallenge-item/InProgressChallengItem.module.scss'
import usePagination from '../../hooks/usePagination';
import Pagination from '../../components/pagination/Pagination';

const InProgressChallengePage = () => {

    const [challenges, setChallenges] = useState<IChallenge[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [totalPage, setTotalPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const {currentPage, handlePageClick} = usePagination();

    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await api.get('/api/challenge/ongoing-challenge', {
                    params:{
                        page:currentPage,
                        size:itemsPerPage
                    }
                });
                console.log('진행중인 챌린지', response.data);
                setTotalPage(response.data.totalPages);
                setItemsPerPage(response.data.size);
                setChallenges(response.data.content);
            } catch (error) {
                console.log(error);
            } finally{
                setIsLoading(false);
            }
        }

        fetchData();
    }, [currentPage, itemsPerPage]);
    

    return (
        <div>
            <h1>진행중인 챌린지</h1>
            {isLoading ? (
                <Loading/>
            ) : (
                <>
                {challenges.length > 0 ? (
                    <>
                    <ul>
                        {challenges.map(challenge => (
                            <InProgressChallengItem
                                key={challenge.id}
                                item={challenge}
                            />
                        ))}
                    </ul>
                    <Pagination
                        pageCount={totalPage}
                        handlePageClick={handlePageClick}
                    />
                    </>
                ) : (
                    <div className={styles.noChallenge}>
                        <img src={noChallenge} alt='no Inprocess challenges'/>
                    </div>
                )}
                </>
            )}
        </div>
    )
}

export default InProgressChallengePage