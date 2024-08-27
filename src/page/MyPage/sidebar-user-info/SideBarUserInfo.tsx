import styles from './SideBarUserInfo.module.scss'
import { MdOutlineModeEdit } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { useUser } from '../../../contexts/UserProvider'
import { useLogout } from '../../../hooks/useLogout'

const SideBarUserInfo = () => {

    const {user} = useUser();
    const handleLogout = useLogout();

    return (
        <div className={styles.sidebar_myinfo}>
            <div className={styles.sidebar_myinfo_detail}>
                <img className={styles.sidebar_userProfileImage} src={user?.profileImage} alt='user-profileImage'/> 
                <Link to={'/modify'}><button><MdOutlineModeEdit style={{color:'#333', fontWeight:'lighter'}}/></button></Link>
                <span className={styles.sidebar_username}>{user?.name}</span>
                <span className={styles.sidebar_useremail}>{user?.email}</span>
            </div>
            <div className={styles.sidebar_user_logout}>
                <button onClick={handleLogout}>로그아웃</button>
            </div>
        </div>
    )
}

export default SideBarUserInfo