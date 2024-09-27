import { useEffect, useState } from 'react'
import api from '../../api/api'
import { UserChallengeRecord } from '../../type/challengeData';
import { useParams } from 'react-router-dom';
import styles from './AppliedDetailPage.module.scss'
import ChallengeDate from '../../components/challengeDateTime/challengeDate/ChallengeDate';
import ChallengeTime from '../../components/challengeDateTime/challengeTime/ChallengeTime';
import CurrentProgress from './currentProgress/CurrentProgress';
import {Link} from 'react-router-dom'
import { countHelper } from '../../utils/countHelper';
import UserAuthImage from './userAuthImage/UserAuthImage';
import AuthResult from './authResult/AuthResult';

type RouteParams = {
    userChallengeId:string;
}

const AppliedDetailPage = () => {

    const [cDetail, setCDetail] = useState<UserChallengeRecord>();
    //const [showMore, setShowMore] = useState(false);
    //const imagesToShow = showMore ? cDetail[0]?.checkRecords : cDetail[0]?.checkRecords?.slice(0, 4);

    const {userChallengeId} = useParams<RouteParams>();

    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await api.get(`/api/challenge/${userChallengeId}/user-info`);
                setCDetail(response.data);
                console.log('디테일', response.data);
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, []);

    return (
        <div className='page'>
            {cDetail ? (
                <div className={styles.detail_container}>
                    <div className={styles.mainImage}>
                        <img src={cDetail.mainImage}/>
                        <h1 className={styles.title}>{cDetail.title}</h1>
                    </div>
                    {/* 챌린지 업로드 날짜 */}
                    <ChallengeDate
                        challenge={cDetail}
                    />
                    {/* 챌린지 업로드 시간 */}
                    <ChallengeTime
                        challenge={cDetail}
                    />
                    {/* 인증현황 차트 */}
                    <CurrentProgress
                        challenge={cDetail}
                    />
                    {/* 인증 실패 성공 횟수 */}
                    <div className={styles.authResult}>
                        <AuthResult
                            userChallengeId={userChallengeId}
                        />
                        <div>
                            <span>상금</span>
                            <span>{cDetail.prize}</span>
                        </div>
                    </div>
                    {/* 유저 인증 사진 */}
                    <h1>나의 인증샷</h1>
                    <UserAuthImage
                        userChallengeId={userChallengeId}
                    />
                    {/* 더보기 버튼 */}
                    {/* {cDetail[0].checkRecords.length > 6 && (
                        <button 
                            className={styles.showMoreButton} 
                            onClick={() => setShowMore(!showMore)}
                        >
                            {showMore ? '간단히 보기' : '더보기'}
                        </button>
                    )} */}
                </div>
            ):<div>챌린지 내역이 없습니다!</div>
        }
        </div>
    )
}

export default AppliedDetailPage