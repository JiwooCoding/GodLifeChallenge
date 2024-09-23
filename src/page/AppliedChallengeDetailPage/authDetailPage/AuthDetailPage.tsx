import { useLocation } from 'react-router-dom'
import { useUser } from '../../../contexts/UserProvider';
import dayjs from 'dayjs';
import styles from './AuthDetailPage.module.scss'
import { FaRegHeart } from "react-icons/fa6";
import { TbMessageCircle } from "react-icons/tb";
import { HiOutlinePaperAirplane } from "react-icons/hi";

const AuthDetailPage = () => {

    const location = useLocation();
    const {record} = location.state || {};

    const {user} = useUser();

    console.log('record', record)

    if(!record) {
        return <p>상세데이터가 없습니다</p>
    }
    
    return (
        <div className='page'>
            <div className={styles.auth_field}>
                <div className={styles.user_info}>
                    <img src={user?.profileImage} alt='user profile Image'/>
                    <span>{user?.name}</span>
                </div>
                <div className={styles.auth_detail}>
                    <img src={record.imageUrl} alt="인증샷" />
                    <div className={styles.icons}>
                        <FaRegHeart size={25}/>
                        <TbMessageCircle size={25}/>
                        <HiOutlinePaperAirplane size={25}/>
                    </div>
                    <div className={styles.auth_detail_text}>
                        <p>{record.description}</p>
                        <p className={styles.date}>{dayjs(record.checkDate).format('YYYY-MM-DD')}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthDetailPage