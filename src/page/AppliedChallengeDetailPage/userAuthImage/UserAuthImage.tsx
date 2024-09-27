import { useEffect, useState } from 'react'
import api from '../../../api/api'
import { UserAuthImages } from '../../../type/challengeData';
import styles from './UserAuthImage.module.scss'
import { Link } from 'react-router-dom';

const UserAuthImage = ({userChallengeId}:{userChallengeId:string | undefined}) => {

    const [userImages, setUserImages] = useState<UserAuthImages>([]);

    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await api.get(`/api/challenge/${userChallengeId}/check-records`);
                console.log('유저인증샷',response.data.content);
                setUserImages(response.data.content);
            } catch (error) {
                console.log('유저 인증 사진 가져오기 실패',error);
            }
        }

        fetchData();
    }, [])
    

    return (
        <div>
            {userImages.length > 0 ? (
                <div className={styles.imageContainer}>
                    {userImages.map((image) => (
                        <div className={styles.imageItem} key={image.postId}>
                            <Link to='/challengeAuthDetail' state={{ image }}>
                                <img src={image.imageUrl} alt={`인증샷`}/>
                                <p className={`${image.status === '인증' ? `${styles.auth_status} ${styles.success}` :`${styles.auth_status} ${styles.fail}`}`}>{image.status}</p>
                            </Link>
                        </div>
                    ))}
                </div>
            ) : (
                <div>인증사진이 없습니다</div>
            )}
        </div>
    )
}

export default UserAuthImage