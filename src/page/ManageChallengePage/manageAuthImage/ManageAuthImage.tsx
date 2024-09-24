import { useEffect, useState } from "react"
import api from "../../../api/api";
import styles from './ManageChallengePage.module.scss'
import { UserChallengeRecord } from "../../../type/challengeData";
import AuthDateOption from "../auth-date-option/AuthDateOption";
import FailButton from "./failButton/FailButton";

interface ManageAuthImageProps {
    selectedStatus:string;
    onStatusChange:(state:string) => void;
    challengeId:string | undefined
}

const ManageAuthImage = ({challengeId, selectedStatus, onStatusChange}:ManageAuthImageProps) => {

    const [userImages, setUserImages] = useState<UserChallengeRecord | null>(null);

    useEffect(() => {
        const fetchAuthImage = async() => {
            try {
                const response = await api.get(`/api/challenge/${challengeId}/check-status`,{
                    params:{
                        authDate:selectedStatus
                    }
                });
                console.log('data==>',response.data);
                setUserImages(response.data);
            } catch (error) {
                console.log('인증사진 받아오기 오류!',error);
            }
        };
        fetchAuthImage();
    }, [challengeId, selectedStatus]);

    return (
        <>
            {userImages && (
                <div className={styles.mainImage}>
                    <img src={userImages.mainImage} alt="Main Image" />
                    <h1 className={styles.title}>{userImages.title}</h1>
                </div>
            )}
            <AuthDateOption
                item={userImages}
                selectedStatus={selectedStatus}
                onStatusChange={onStatusChange}
            />
            <div className={styles.authImage}>
                {userImages?.checkRecords && userImages.checkRecords.length > 0 ? (
                    userImages.checkRecords.map((record) => (
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
        </>
    )
}

export default ManageAuthImage