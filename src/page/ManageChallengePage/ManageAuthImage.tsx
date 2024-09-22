import { useEffect, useState } from "react"
import FailButton from "./failButton/FailButton"
import api from "../../api/api";
import { useParams } from "react-router-dom";
import styles from './ManageChallengePage.module.scss'
import { UserChallengeRecord } from "../../type/challengeData";

type RouteParmas = {
    challengeId:string;
}

const ManageChallengePage = () => {

    const {challengeId} = useParams<RouteParmas>();
    const [userImages, setUserImages] = useState<UserChallengeRecord | null>(null);

    useEffect(() => {
        const fetchAuthImage = async() => {
            try {
                const response = await api.get(`/api/challenge/${challengeId}/check-status`);
                console.log(response.data);
                setUserImages(response.data);
            } catch (error) {
                console.log('인증사진 받아오기 오류!',error);
            }
        };
        fetchAuthImage();
    }, [challengeId]);
    

    return (
        <div className="page">
            <div className={styles.managePage}>
                <h1>관리 목록</h1>
                <p>
                    <b>기준에 맞지 않는 유저</b>의 챌린지 인증 사진은 인증 실패로 처리할 수 있습니다.
                </p>
                {userImages && (
                    <div className={styles.mainImage}>
                        <img src={userImages.mainImage} alt="Main Image" />
                        <h1 className={styles.title}>{userImages.title}</h1>
                    </div>
                )}
                <div className={styles.authImage}>
                    
                    {userImages?.checkRecord && userImages.checkRecord.length > 0 ? (
                        userImages.checkRecord.map((record) => (
                            <div key={record.postId} className={styles.imageContainer}>
                                <span>유저이름: {record.userName}</span>
                                <img className={styles.user_authImage} src={record.imageUrl} alt={`check record`} />
                                <FailButton postId={record.postId}/>
                            </div>
                        ))
                    ) : (
                        <div>챌린지에 참여한 유저가 없습니다</div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ManageChallengePage