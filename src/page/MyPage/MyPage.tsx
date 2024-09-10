import styles from './Mypage.module.scss'
import Gift from './point-history/gift';
import Product from './point-history/product';
import Event from './point-history/event';
import UserInfo from './user-info/UserInfo';
import Donation from './point-history/donation';
import { useState } from 'react';
import SideBar from './sidebar/SideBar';
import ReigsterChallengesPage from '../RegisteredChallengesPage/ReigsterChallengesPage';
import AppliedChallengePage from '../AppliedChallengePage';

const MyPage = () => {
    
    const [selectedComponent, setSelectedComponent] = useState<'Product' | 'gift' | 'donation' | 'event' | 'participate' | 'register' | null>(null);

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
            case 'participate':
                return <AppliedChallengePage/>;   
            case 'register':
                return <ReigsterChallengesPage/>;    
            default:
                return null;
        }
    };


    return (
        <div className='mypage'>
            <h1 className={styles.mypage_title}>마이페이지</h1>
            <div className={styles.mypage_container}>
                <SideBar setSelectedComponent={setSelectedComponent}/>
                <div className={styles.mypage_main}>
                    <UserInfo selectedComponent={selectedComponent}/>
                    {renderComponent()}
                </div>
            </div>
        </div>
        );
    };

export default MyPage
