import { useEffect, useState } from "react";
import api from "../../../api/api";
import AppliedItem from "./appliedChallenge-item/AppliedItem";
import Loading from "../../../components/loading/Loading";
import noChallenge from '../../../image/challenge/noChallengeHistory.png'
import styles from './AppliedList.module.scss'
import { IChallenge } from "../../../type/IChallenge";
import usePagination from "../../../hooks/usePagination";
import Pagination from "../../../components/pagination/Pagination";

interface AppliedListProps{
    state: string;
}

const AppliedList = ({state}:AppliedListProps) => {

    const [challenges, setChallenges] = useState<IChallenge[]>([]);
    const [filteredChallenges, setFilteredChallenges] = useState<IChallenge[]>([]);
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const {currentPage, handlePageClick} = usePagination();

    useEffect(() => {
        const fetchParticipationChallenges = async() => {
            try {
                const response = await api.get(`/api/user/challenge/participating`,{
                    params:{
                        state:state === '전체' ? null : state,
                        page:currentPage,
                        size:itemsPerPage,
                    }
                });
                console.log('진행중 챌린지', response.data);
                setChallenges(response.data.content);
                setTotalPages(response.data.totalPages);
                setItemsPerPage(response.data.size);
            } catch (error) {
                console.log('챌린지 참여 내역 데이터 가져오기 실패!!',error);
            } finally{
                setLoading(false);
            }
        };

        fetchParticipationChallenges();
    }, [state, currentPage, itemsPerPage]);
    

    useEffect(() => {
        const filterChallengStatus = () => {
            const filtered = challenges.filter(challenge => {
                const statusMatch = state === '전체' || challenge.state === state;
                return statusMatch;
            });
            setFilteredChallenges(filtered);
        }
        filterChallengStatus();
    }, [challenges, state])
    
    const handleCancle = (challengeId:string) => {
        setChallenges(prevChallenges => prevChallenges.filter(challenge => challenge.id !== challengeId));
    }

    return (
        <>
            {loading ? (
                <Loading/>
            ) : filteredChallenges.length > 0 ? (
                <>
                <ul>
                    {filteredChallenges.map(challenge => (
                        <AppliedItem
                            key={challenge.id}
                            item={challenge}
                            onCancle={handleCancle}
                        />
                    ))}
                </ul>
                <Pagination
                    pageCount={totalPages}
                    handlePageClick={handlePageClick}
                />
                </>
            ): (
                <div className={styles.noChallenge}>
                    <img src={noChallenge} alt="no apply challenge"/>
                </div>
            )}
        </>
    )
}

export default AppliedList