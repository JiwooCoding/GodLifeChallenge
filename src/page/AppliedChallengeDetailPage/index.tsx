import { useEffect, useState } from 'react'
import api from '../../api/api'
import { IChallengeHistory } from '../../type/challengeData';
import { useParams } from 'react-router-dom';
import { challenges } from '../../data/challengeData';
import styles from './AppliedDetailPage.module.scss'
import { calculatorDday } from '../../utils/calculatorDday';

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
                    <div className={styles.date}>
                        <span>매일, 하루 동안</span>
                        <span>{challenge.startDate} - {challenge.endDate}</span>
                        <span>인증가능: ({challenge.uploadStartTime} ~ {challenge.uploadEndTime})</span>
                    </div>
                    <div className={styles.myAuth}>
                        <h1>나의 인증 현황</h1>
                        <span>달성률 : {challenge.progress}%</span>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default AppliedDetailPage