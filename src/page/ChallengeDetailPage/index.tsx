import { useEffect, useState } from 'react'
import styles from './ChallengeDetailPage.module.scss'
import api from '../../api/api'
import { IChallenge } from '../../type/IChallenge'
import { useParams } from 'react-router-dom'
import { IoMdPerson } from "react-icons/io";
import { IoCheckmark } from "react-icons/io5";
import { CiCalendar } from "react-icons/ci";
import { CgRadioCheck } from "react-icons/cg";
import { CgClose } from "react-icons/cg";
import ChallengeJoinButton from './challenge-joinButton/ChallengeJoinButton'
import ChallengeDescription from './challenge-description/ChallengeDescription'
import { formattedTime } from '../../utils/formattedTime'
import { calculatorDday } from '../../utils/calculatorDday'

type RouteParams = {
    challengeId?:string;
}

const ChallengeDetailPage = () => {

    //URL에서 challengeId 읽어오기
    const {challengeId} = useParams<RouteParams>();
    const [challengeData, setChallengeData] = useState<IChallenge | null>(null);
    const [isJoined, setIsJoined] = useState(false);

    useEffect(() => {
        const fetchChallengeDetail = async() => {
            try {
                if(challengeId){
                    const response = await api.get<IChallenge>(`/api/challenge/${challengeId}`);
                    console.log(response.data)
                    setChallengeData(response.data);
                    setIsJoined(response.data.isJoined);
                }else{
                    console.log('챌린지 ID가 없습니다');
                }
            } catch (error) {
                console.log('챌린지 상세 데이터 받아오기 실패', error);
            }
        }

        fetchChallengeDetail();
    }, [challengeId]);
    
    //챌린지 기간 구하기
    const period = calculatorDday(challengeData?.startDate ?? '', challengeData?.endDate ?? '');

    return (
        <>
        <div className='page'>
            {/* {challengeData ? ():()} */}
            <div className={styles.challengeDetail}>
                {/* challenge mainImage */}
                <div className={styles.challengeDetail_mainImage}>
                    <img src={challengeData?.mainImage} className={styles.mainImage} alt='challenge mainImage'/>
                </div>
                {/* challenge upload description */}
                <div className={styles.challengeDetail_container}>
                    {/* challenge title & participants */}
                    <div className={styles.challengeDetail_top}>
                        <span className={styles.title}>{challengeData?.title}</span>
                        <div className={styles.participants}>
                            <IoMdPerson size={15} style={{color:'rgb(127 127 127)'}}/>
                            <span>{challengeData?.participants ?? 0} / <b>{challengeData?.participantsLimit}</b></span>
                        </div>
                    </div>
                    {/* challenge startDay & endDay */}
                    <h1>챌린지 업로드 기간</h1>
                    <div className={styles.challenge_schedule_date}>
                        <div className={styles.challenge_date}>
                            <CiCalendar size={22} style={{fontWeight:'bold'}}/>
                            <span>{challengeData?.startDate} ~ {challengeData?.endDate}</span>
                        </div>
                        <div className={styles.challenge_duration}>
                            <span>매일</span>
                            <span>{calculatorDday(challengeData?.startDate ?? '', challengeData?.endDate ?? '')}일 동안</span>
                        </div>
                    </div>
                    {/* challenge  */}
                    {/* challenge startTime & endTime */}
                    <h1>챌린지 업로드 시간</h1>
                    <div className={styles.challenge_schedule_time}>
                        <div className={styles.challenge_startTime}>
                            <span>시작시간</span>
                            <span className={styles.time}>{challengeData?.uploadStartTime.slice(0,5)}</span>
                        </div>
                        <div className={styles.challenge_endTime}>
                            <span>종료시간</span>
                            <span className={styles.time}>{challengeData?.uploadEndTime.slice(0,5)}</span>
                        </div>
                    </div>
                    {/* 챌린지 환급금 설명 */}
                    <ChallengeDescription/>
                    {/* AuthMethod */}
                    <h1>이렇게 인증해 주세요</h1>
                    <div className={styles.challenge_authMethod}>
                        <div className={styles.challenge_authImage}>
                            <div>
                                <img src={challengeData?.successImage} alt='success image'/>
                                <div className={styles.authImage_success}><CgRadioCheck size={18} style={{color:'#fff'}}/></div>
                            </div>
                            <div>
                                <img src={challengeData?.failImage} alt='fail image'/>
                                <div className={styles.authImage_fail}><CgClose size={18} style={{color:'#fff'}}/></div>
                            </div>
                        </div>
                        <div className={styles.authMethod_text}>
                            <IoCheckmark size={20}/>
                            <span>{challengeData?.authMethod}</span>
                        </div>
                        <div className={styles.authMethod_text}>
                            <IoCheckmark size={20}/>
                            <span>인증 방법이 지켜지지 않을 경우 <b>챌린지 미참여</b>로 간주합니다.</span>
                        </div>
                    </div>
                    {/* challenge warning */}
                    <h1>챌린지 진행 시 꼭 알아주세요!</h1>
                    <div>
                        <div className={styles.challenge_warning}>
                            <IoCheckmark size={20}/>
                            <span>{formattedTime(challengeData?.uploadStartTime ?? '00:00')} ~ {formattedTime(challengeData?.uploadEndTime ?? '00:00')} 사이에 인증하셔야 합니다.</span>
                        </div>
                        <div className={styles.challenge_warning}>
                            <IoCheckmark size={20}/>
                            <span>{period}일 동안 매일, 하루에 1번 인증샷을 촬영하셔야 합니다.</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* 챌린지 날짜 넘겨주기 */}
        <ChallengeJoinButton
            startDate={challengeData?.startDate}
            endDate={challengeData?.endDate}
            period={period}
            challengeId={challengeId}
            isJoined={isJoined}
            startTime={challengeData?.uploadStartTime}
            endTime={challengeData?.uploadEndTime}
        />
        </>
    )
}

export default ChallengeDetailPage