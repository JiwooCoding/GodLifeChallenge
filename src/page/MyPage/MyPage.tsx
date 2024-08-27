import styles from './Mypage.module.scss'
import Gift from './point-history/gift';
import Product from './point-history/product';
import Event from './point-history/event';
import UserInfo from './user-info/UserInfo';
import SideBarUserInfo from './sidebar-user-info/SideBarUserInfo';


const MyPage = () => {
    

    return (
        <div className='mypage'>
            <h1 className={styles.mypage_title}>마이페이지</h1>
            <div className={styles.mypage_container}>
                <SideBarUserInfo/>
                <div className={styles.mypage_main}>
                    <UserInfo/>
                    <Product/>
                    <Event/>
                    <Gift/>
                </div>
            </div>
        </div>
        );
    };

export default MyPage;