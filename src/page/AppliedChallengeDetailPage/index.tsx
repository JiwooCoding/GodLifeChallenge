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
    

    // const {challengeId} = useParams<RouteParams>();

    // useEffect(() => {
    //     const fetchData = async() => {
    //         try {
    //             const response = await api.get(`api/challenge/${challengeId}/auth-detail`);
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
                </div>
            ))}
        </div>
    )
}

export default AppliedDetailPage