import { useEffect, useState } from 'react';
import api from '../../../api/api';
import RegisterChallengeItem from './registerChallenge-item/RegisterChallengeItem';
import Loading from '../../../components/loading/Loading';
import noChallenge from '../../../image/challenge/noChallengeHistory.png'
import styles from './RegisterChallengeList.module.scss'
import { IChallenge } from '../../../type/IChallenge';
import usePagination from '../../../hooks/usePagination';
import Pagination from '../../../components/pagination/Pagination';

interface RegisterChallengeListProps{
    state: string;
}

const RegisterChallengeList = ({state}:RegisterChallengeListProps) => {

    const [challenges, setChallenges] = useState<IChallenge[]>([]);
    const [filteredChallenges, setFilteredChallenges] = useState<IChallenge[]>([]);
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const {currentPage, handlePageClick} = usePagination();

    useEffect(() => {
        const fetchRegisterChallenges = async () => {
            try {
                const response = await api.get(`/api/user/challenge/admin`,{
                    params:{
                        state:state === '전체' ? null : state,
                        page:currentPage,
                        size:itemsPerPage
                    }
                });
                console.log('개설 챌린지 내역',response.data)
                setTotalPages(response.data.totalPages);
                setItemsPerPage(response.data.size);
                setChallenges(response.data.content);
            } catch (error) {
                console.log('챌린지 업로드 데이터를 가져올 수 없습니다!', error);
            } finally {
                setLoading(false); 
            }
        };

        fetchRegisterChallenges();
    }, [currentPage, itemsPerPage]);

    useEffect(() => {
        const filterChallengStatus = () => {
            const filtered = challenges.filter(challenge => {
                const statusMatch = state === '전체' || challenge.state === state;

                return statusMatch;
            });
            setFilteredChallenges(filtered);
        }
        filterChallengStatus();
    }, [challenges, state]);

    const handleDelete = (challengeId:string) => {
        setChallenges(prevChallenge => prevChallenge.filter(challenge => challenge.id !== challengeId));
    }

    return (
        <>
            {loading ? (
                <Loading/>
            ) : filteredChallenges.length > 0 ? (
            <>
            <ul>
                {filteredChallenges.map(challenge => (
                    <RegisterChallengeItem
                        key={challenge.id}
                        item={challenge}
                        onDelete={handleDelete}
                    />
                ))}
            </ul>
            <Pagination
                pageCount={totalPages}
                handlePageClick={handlePageClick}
            />
            </>
            ) : (
                <div className={styles.noChallenge}>
                    <img src={noChallenge} alt="no register challenge"/>
                </div>
            )}
        </>
    );
}

export default RegisterChallengeList;
