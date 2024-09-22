import { useEffect, useState } from 'react'
import api from '../../api/api'
import { UserChallengeRecord } from '../../type/challengeData';
import { useParams } from 'react-router-dom';
import styles from './AppliedDetailPage.module.scss'
import { CiCalendar } from 'react-icons/ci';
import ChallengeDate from '../../components/challengeDateTime/challengeDate/ChallengeDate';
import ChallengeTime from '../../components/challengeDateTime/challengeTime/ChallengeTime';
import CurrentProgress from './challenge-currentProgress/CurrentProgress';
import {Link} from 'react-router-dom'

type RouteParams = {
    userChallengeId:string;
}

const AppliedDetailPage = () => {

    const [cDetail, setCDetail] = useState<UserChallengeRecord[]>([]);
    const [showMore, setShowMore] = useState(false);
    const imagesToShow = showMore ? cDetail[0]?.checkRecords : cDetail[0]?.checkRecords?.slice(0, 4);

    const {userChallengeId} = useParams<RouteParams>();

    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await api.get(`/api/challenge/${userChallengeId}/details`);
                setCDetail(response.data.content);
                console.log('디테일', response.data.content);
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, []);

    return (
        <div className='page'>
            {cDetail.length > 0 ? (
                <div className={styles.detail_container}>
                    <div className={styles.mainImage}>
                        <img src={cDetail[0].mainImage}/>
                        <h1 className={styles.title}>{cDetail[0].title}</h1>
                    </div>
                    {/* 챌린지 업로드 날짜 */}
                    <ChallengeDate
                        challenge={cDetail[0]}
                    />
                    {/* 챌린지 업로드 시간 */}
                    <ChallengeTime
                        challenge={cDetail[0]}
                    />
                    {/* 인증현황 차트 */}
                    <CurrentProgress
                        challenge={cDetail[0]}
                    />
                    {/* 인증 실패 성공 횟수 */}
                    <div className={styles.authResult}>
                        <div>
                            <span>인증성공</span>
                            <span>1회</span>
                        </div>
                        <div>
                            <span>인증실패</span>
                            <span>0회</span>
                        </div>
                        <div>
                            <span>상금</span>
                            <span>{cDetail[0].prize}</span>
                        </div>
                    </div>
                    {/* 유저 인증 사진 */}
                    <h1>나의 인증샷</h1>
                    <div className={styles.imageContainer}>
                        {cDetail[0].checkRecords && cDetail[0].checkRecords.length > 0 ? (
                            <div>
                                {cDetail[0].checkRecords.map((record, index) => (
                                    <div className={styles.imageItem} key={index}>
                                        <Link to='/challengeAuthDetail' state={{ record }}>
                                            <img src={record.imageUrl} alt={`인증샷 ${index}`} />
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        ):
                        (
                            <div>인증 사진이 없습니다.</div>
                        )}
                    </div>

                    {/* 더보기 버튼 */}
                    {/* {challenges[0].checkRecords.length > 6 && (
                        <button 
                            className={styles.showMoreButton} 
                            onClick={() => setShowMore(!showMore)}
                        >
                            {showMore ? '간단히 보기' : '더보기'}
                        </button>
                    )} */}
                </div>
            ):<div>fheldfnd</div>
        }
        </div>
    )
}

export default AppliedDetailPage