import styles from './SideBarUserInfo.module.scss'
import { MdOutlineModeEdit } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { useUser } from '../../../contexts/UserProvider'
import { useLogout } from '../../../hooks/useLogout'
import { useState } from 'react'

interface SideBarUserInfoProps {
    setSelectedComponent: React.Dispatch<React.SetStateAction<'Product' | 'donation' | 'gift' | 'event'>>;
}

const SideBarUserInfo = ({setSelectedComponent}:SideBarUserInfoProps) => {

    const [activeItem, setActiveItem] = useState<'Product' | 'donation' | 'gift' | 'event'>('Product');
    const {user} = useUser();
    const handleLogout = useLogout();

    const handleClick = (component:'Product' | 'donation' | 'gift' | 'event') => {
        setSelectedComponent(component);
        setActiveItem(component);
    }

    return (
        <div className={styles.sidebar_myinformation}>
            <div className={styles.sidebar_myinfo_detail}>
                <img className={styles.sidebar_userProfileImage} src={user?.profileImage} alt='user-profileImage'/> 
                <Link to={'/modify'}><button><MdOutlineModeEdit style={{color:'#333', fontWeight:'lighter'}}/></button></Link>
                <span className={styles.sidebar_username}>{user?.name}</span>
                <span className={styles.sidebar_useremail}>{user?.email}</span>
            </div>
            <div className={styles.sidebar_user_logout} onClick={handleLogout}>
                <button>로그아웃</button>
            </div>
            <div className={styles.sidebar_movePage}>
                <ul className={styles.sidebar_myshopping}>
                    <h2 className={styles.sidebar_h2}>마이 쇼핑</h2>
                    <li 
                        onClick={()=>handleClick('Product')}
                        className={activeItem === 'Product' ? styles.active : ''}
                    >
                        주문 조회
                    </li>
                    <li 
                        onClick={()=>handleClick('donation')}
                        className={activeItem === 'donation' ? styles.active : ''}
                    >
                        기부 내역 조회
                    </li>
                    <li 
                        onClick={()=>handleClick('gift')}
                        className={activeItem === 'gift' ? styles.active : ''}
                    >
                        선물 내역 조회
                    </li>
                    <li 
                        onClick={()=>handleClick('event')}
                        className={activeItem === 'event' ? styles.active : ''}
                    >
                        적립 내역 조회
                    </li>
                </ul>
                <ul className={styles.sidebar_myinfo}>
                    <h2 className={styles.sidebar_h2}>마이 정보</h2>
                    <Link to={'/modify'}><li>회원정보 수정</li></Link>
                    <li>회원탈퇴</li>
                </ul>
            </div>
        </div>
    )
}

export default SideBarUserInfo