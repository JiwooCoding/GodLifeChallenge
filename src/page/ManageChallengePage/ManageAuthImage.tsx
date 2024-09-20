import { useEffect, useState } from "react"
import FailButton from "./failButton/FailButton"
import api from "../../api/api";
import { useParams } from "react-router-dom";
import { authImage } from "../../data/challengeData";
import styles from './ManageChallengePage.module.scss'
import main from '../../image/donation/love.png'

type RouteParmas = {
    challengeId:string;
}

const ManageChallengePage = () => {

    const {challengeId} = useParams();
    const [userImages, setUserImages] = useState<RouteParmas>();

    useEffect(() => {
        const fetchAuthImage = async() => {
            try {
                const response = await api.get(`/api/challenge/${challengeId}/posts`);
                setUserImages(response.data);
            } catch (error) {
                console.log('인증사진 받아오기 오류!',error);
            }
        };
        fetchAuthImage();
    }, [challengeId]);
    

    // 백엔드 연결 후 적용할 예정
    return (
        <div className="page">
            <div className={styles.managePage}>
                <h1>관리 목록</h1>
                <p><b>기준에 맞지 않는 유저</b>의 챌린지 인증 사진은 인증 실패로 처리할 수 있습니다.</p>
                <div className={styles.mainImage}>
                    <img src={main}/>
                    <h1 className={styles.title}>8시 기상 미션</h1>
                </div>
                <div className={styles.authImage}>
                    {authImage.map((image, index) => (
                        <div className={styles.imageContainer}>
                            <span>{image.userName}</span>
                            <img key={image.id} src={image.images} alt={`user upload ${index}`}/>
                            <FailButton/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ManageChallengePage