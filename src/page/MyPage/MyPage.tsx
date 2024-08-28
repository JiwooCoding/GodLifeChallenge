import styles from './Mypage.module.scss'
import Gift from './point-history/gift';
import Product from './point-history/product';
import Event from './point-history/event';
import UserInfo from './user-info/UserInfo';
import SideBarUserInfo from './sidebar-user-info/SideBarUserInfo';
import Donation from './point-history/donation';
import { useState } from 'react';

const MyPage = () => {
    
    const [selectedComponent, setSelectedComponent] = useState<'Product' | 'gift' | 'donation' | 'event'>('Product');

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
            default:
                return null;
        }
    };


    return (
        <div className='mypage'>
            <h1 className={styles.mypage_title}>마이페이지</h1>
            <div className={styles.mypage_container}>
                <SideBarUserInfo setSelectedComponent={setSelectedComponent}/>
                <div className={styles.mypage_main}>
                    <UserInfo/>
                    {renderComponent()}
                </div>
            </div>
        </div>
        );
    };

export default MyPage;