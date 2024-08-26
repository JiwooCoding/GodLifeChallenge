import styles from './Mypage.module.scss'
import { useUser } from '../../contexts/UserProvider';
import { MdOutlineModeEdit } from "react-icons/md";
import { Link } from 'react-router-dom';
import { useLogout } from '../../hooks/useLogout';
import Gift from './point-history/gift';
import Product from './point-history/product';
import Event from './point-history/event';


const MyPage = () => {

    const {user} = useUser();
    const handleLogout = useLogout();

    return (
        <div className='mypage'>
            <div className={styles.mypage_container}>
                <div className={styles.myinfo}>
                    <div className={styles.myinfo_detail}>
                        <img className={styles.userProfileImage} src={user?.profileImage} alt='user-profileImage'/> 
                        <Link to={'/modify'}><button><MdOutlineModeEdit style={{color:'#333', fontWeight:'lighter'}}/></button></Link>
                        <span className={styles.username}>{user?.name}</span>
                    </div>
                    <div className={styles.user_logout_button}>
                        <button onClick={handleLogout}>로그아웃</button>
                    </div>
                </div>
                {/* <div className={styles.verticalLine}></div> */}
                <div className={styles.mypage_main}>
                    <Product/>
                    <Event/>
                    <Gift/>
                </div>
            </div>
        </div>
        );
    };

export default MyPage;