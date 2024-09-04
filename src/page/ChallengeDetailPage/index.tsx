import { useEffect, useState } from 'react'
import styles from './ChallengeDetailPage.module.scss'
import mainImage from '../../image/girl2.png'
import api from '../../api/api'
import { IChallenge } from '../../type/IChallenge'
import { useParams } from 'react-router-dom'
import { IoMdPerson } from "react-icons/io";
import { IoCheckmark } from "react-icons/io5";
import { CiCalendar } from "react-icons/ci";
import success from '../../image/girl1.png'
import fail from '../../image/girl2.png'
import { CgRadioCheck } from "react-icons/cg";
import { CgClose } from "react-icons/cg";
import ChallengeJoinButton from './challenge-joinButton/ChallengeJoinButton'

// type RouteParams = {
//     challengeId?:string;
// }

const ChallengeDetailPage = () => {


    // URL에서 challengeId 읽어오기
    // const {challengeId} = useParams<RouteParams>();
    // const [challengeData, setChallengeData] = useState<IChallenge | null>(null);

    // useEffect(() => {
    //     const fetchChallengeDetail = async() => {
    //         try {
    //             if(challengeId){
    //                 const response = await api.get(`/api/challenge/${challengeId}`);
    //                 setChallengeData(response.data);
    //             }else{
    //                 console.log('챌린지 ID가 없습니다');
    //             }
    //         } catch (error) {
    //             console.log('챌린지 상세 데이터 받아오기 실패', error);
    //         }
    //     }

    //     fetchChallengeDetail();
    // }, [challengeId]);
    

    return (
        <>
        <div className='page'>
            {/* {challengeData ? ():()} */}
            <div className={styles.challengeDetail}>
                {/* challenge mainImage */}
                <div className={styles.challengeDetail_mainImage}>
                    <img src={mainImage} className={styles.mainImage} alt='challenge mainImage'/>
                </div>
                {/* challenge upload description */}
                <div className={styles.challengeDetail_container}>
                    {/* challenge title & participants */}
                    <div className={styles.challengeDetail_top}>
                        <span className={styles.title}>8시 기상 미션</span>
                        <div className={styles.participants}>
                            <IoMdPerson size={15} style={{color:'rgb(127 127 127)'}}/>
                            <span>13 / <b>30</b></span>
                        </div>
                    </div>
                    {/* challenge startDay & endDay */}
                    <h1>챌린지 업로드 기간</h1>
                    <div className={styles.challenge_schedule_date}>
                        <div className={styles.challenge_date}>
                            <CiCalendar size={22} style={{fontWeight:'bold'}}/>
                            <span>2024.08.30 ~ 2024.09.02</span>
                        </div>
                        <div className={styles.challenge_duration}>
                            <span>매일</span>
                            <span>10일 동안</span>
                        </div>
                    </div>
                    {/* challenge startTime & endTime */}
                    <h1>챌린지 업로드 시간</h1>
                    <div className={styles.challenge_schedule_time}>
                        <div className={styles.challenge_startTime}>
                            <span>시작시간</span>
                            <span className={styles.time}>07:00</span>
                        </div>
                        <div className={styles.challenge_endTime}>
                            <span>종료시간</span>
                            <span className={styles.time}>08:00</span>
                        </div>
                    </div>
                    {/* AuthMethod */}
                    <h1>이렇게 인증해 주세요</h1>
                    <div className={styles.challenge_authMethod}>
                        <div className={styles.challenge_authImage}>
                            <div>
                                <img src={success} alt='success image'/>
                                <div className={styles.authImage_success}><CgRadioCheck size={18} style={{color:'#fff'}}/></div>
                            </div>
                            <div>
                                <img src={fail} alt='fail image'/>
                                <div className={styles.authImage_fail}><CgClose size={18} style={{color:'#fff'}}/></div>
                            </div>
                        </div>
                        <div className={styles.authMethod_text}>
                            <IoCheckmark size={20}/>
                            <span>1만보 이상 걸음 수가 기록된 앱 화면 또는 스마트 워치 사진 올리기</span>
                        </div>
                        <div className={styles.authMethod_text}>
                            <IoCheckmark size={20}/>
                            <span>인증 방법이 지켜지지 않을 경우 <b>챌린지 미참여</b>로 간주합니다.</span>
                        </div>
                    </div>
                    {/* challenge warning */}
                    <h1>챌린지 진행 시 꼭 알아주세요!</h1>
                    <div className={styles.challenge_warning}>
                        <IoCheckmark size={20}/>
                        <span>00시 </span>
                    </div>
                </div>
            </div>
        </div>
        {/* 챌린지 날짜 넘겨주기 */}
        <ChallengeJoinButton/>
        </>
    )
}

export default ChallengeDetailPage