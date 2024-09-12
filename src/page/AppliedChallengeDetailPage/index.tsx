import { useEffect, useState } from 'react'
import api from '../../api/api'
import { IChallengeHistory } from '../../type/challengeData';
import { useParams } from 'react-router-dom';
import { challenges } from '../../data/challengeData';
import styles from './AppliedDetailPage.module.scss'
import { calculatorDday } from '../../utils/calculatorDday';
import { CiCalendar } from 'react-icons/ci';

type RouteParams = {
    challengeId:string;
}

const AppliedDetailPage = () => {

    const [cDetail, setCDetail] = useState<IChallengeHistory>();
    const [showMore, setShowMore] = useState(false);
    //const imagesToShow = showMore ? challenge.checkRecords : challenge.checkRecords.slice(0, 4);


    // const {challengeId} = useParams<RouteParams>();

    // useEffect(() => {
    //     const fetchData = async() => {
    //         try {
    //             const response = await api.get(`/api/challenge/${challengeId}/details`);
    //             setCDetail(response.data);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }

    //     fetchData();
    // }, []);


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
                    {/* 챌린지 업로드 시간 */}
                    <h1>챌린지 업로드 시간</h1>
                    <div className={styles.challenge_schedule_time}>
                        <div className={styles.challenge_startTime}>
                            <span>시작시간</span>
                            <span className={styles.time}>{challenge.uploadStartTime.slice(0,5)}</span>
                        </div>
                        <div className={styles.challenge_endTime}>
                            <span>종료시간</span>
                            <span className={styles.time}>{challenge.uploadEndTime.slice(0,5)}</span>
                        </div>
                    </div>
                    {/* 인증현황 차트 */}
                    <div className={styles.myAuth}>
                        <h1>나의 인증 현황</h1>
                        <div className={styles.myAuth_state}>
                            <div className={styles.progress}>
                                <span>달성률</span>
                                <span>{challenge.progress}%</span>
                            </div>
                            <div className={styles.deposit}>
                                <span>예치금</span>
                                <span>10,000</span>
                            </div>
                        </div>
                        <div className={styles.progressBar}>
                            <div
                                className={styles.progressFill}
                                style={{ width: `${challenge.progress}%` }} ></div>
                        </div>
                    </div>
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
                        {challenge.checkRecords.map((image, index) => (
                            <div className={styles.imageItem} key={index}>
                                <img src={image} alt={`인증샷 ${index}`} />
                            </div>
                        ))}
                    </div>

                    {/* 더보기 버튼 */}
                    {challenge.checkRecords.length > 4 && (
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