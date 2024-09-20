import { useEffect, useState } from 'react'
import api from '../../api/api'
import { UserChallengeRecord } from '../../type/challengeData';
import { useParams } from 'react-router-dom';
import { challenges } from '../../data/challengeData';
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

    const [cDetail, setCDetail] = useState<UserChallengeRecord>();
    const [showMore, setShowMore] = useState(false);
    //const imagesToShow = showMore ? cDetail.checkRecords : cDetail.checkRecords.slice(0, 4);


    const {userChallengeId} = useParams<RouteParams>();

    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await api.get(`/api/challenge/${userChallengeId}/details`);
                setCDetail(response.data);
                console.log('detail',response.data);
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, []);

    return (
        <div className='page'>
            {challenges.map(challenge => (
                <div className={styles.detail_container}>
                    <div className={styles.mainImage}>
                        <img src={challenge.mainImage}/>
                        <h1 className={styles.title}>{challenge.title}</h1>
                    </div>
                    {/* 챌린지 업로드 날짜 */}
                    <h1>챌린지 업로드 기간</h1>
                    <div className={styles.challenge_schedule_date}>
                        <div className={styles.challenge_date}>
                            <CiCalendar size={22} style={{fontWeight:'bold'}}/>
                            <span>{challenge.startDate} ~ {challenge.endDate}</span>
                        </div>
                        <div className={styles.challenge_duration}>
                            <span>매일</span>
                            <span>1일 동안</span>
                        </div>
                    </div>
                    <ChallengeDate
                        challenge={challenge}
                    />
                    {/* 챌린지 업로드 시간 */}
                    <ChallengeTime
                        challenge={challenge}
                    />
                    {/* 인증현황 차트 */}
                    <CurrentProgress
                        challenge={challenge}
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
                            <span>+ 2,000P</span>
                        </div>
                    </div>
                    {/* 유저 인증 사진 */}
                    <h1>나의 인증샷</h1>
                    <div className={styles.imageContainer}>
                        {challenges[0].checkRecords.map((record, index) => (
                            <div className={styles.imageItem} key={index}>
                                <Link to='/challengeAuthDetail' state={{ record }}>
                                    <img src={record.image} alt={`인증샷 ${index}`} />
                                </Link>
                            </div>
                        ))}
                    </div>

                    {/* 더보기 버튼 */}
                    {challenges[0].checkRecords.length > 6 && (
                        <button 
                            className={styles.showMoreButton} 
                            onClick={() => setShowMore(!showMore)}
                        >
                            {showMore ? '간단히 보기' : '더보기'}
                        </button>
                    )}
                </div>
            ))}
        </div>
    )
}

export default AppliedDetailPage