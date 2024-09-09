import styles from './Mypage.module.scss'
import Gift from './point-history/gift';
import Product from './point-history/product';
import Event from './point-history/event';
import UserInfo from './user-info/UserInfo';
<<<<<<< HEAD
import Donation from './point-history/donation';
import { useState } from 'react';
import SideBar from './sidebar/SideBar';
import ReigsterChallengesPage from '../RegisteredChallengesPage/ReigsterChallengesPage';
import AppliedChallengePage from '../AppliedChallengePage';

const MyPage = () => {
    
    const [selectedComponent, setSelectedComponent] = useState<'Product' | 'gift' | 'donation' | 'event' | 'participate' | 'register' | null>(null);
=======
import SideBarUserInfo from './sidebar-user-info/SideBarUserInfo';
import Donation from './point-history/donation';
import { useState } from 'react';

const MyPage = () => {
    
    const [selectedComponent, setSelectedComponent] = useState<'Product' | 'gift' | 'donation' | 'event'>('Product');
>>>>>>> a1d19155327a5ad1077075b1044141dd561e44d0

    const renderComponent = () => {
        switch(selectedComponent){
            case 'Product':
                return <Product/>;
            case 'donation':
                return <Donation/>;
            case 'event':
                return <Event/>;
            case 'gift':
                return <Gift/>;
<<<<<<< HEAD
            case 'participate':
                return <AppliedChallengePage/>;   
            case 'register':
                return <ReigsterChallengesPage/>;    
=======
>>>>>>> a1d19155327a5ad1077075b1044141dd561e44d0
            default:
                return null;
        }
    };


    return (
        <div className='mypage'>
            <h1 className={styles.mypage_title}>마이페이지</h1>
            <div className={styles.mypage_container}>
<<<<<<< HEAD
                <SideBar setSelectedComponent={setSelectedComponent}/>
                <div className={styles.mypage_main}>
                    <UserInfo selectedComponent={selectedComponent}/>
=======
                <SideBarUserInfo setSelectedComponent={setSelectedComponent}/>
                <div className={styles.mypage_main}>
                    <UserInfo/>
>>>>>>> a1d19155327a5ad1077075b1044141dd561e44d0
                    {renderComponent()}
                </div>
            </div>
        </div>
        );
    };

<<<<<<< HEAD
export default MyPage
=======
export default MyPage;
>>>>>>> a1d19155327a5ad1077075b1044141dd561e44d0
