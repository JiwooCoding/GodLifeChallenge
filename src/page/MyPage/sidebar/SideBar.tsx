import styles from './SideBar.module.scss'
import { MdOutlineModeEdit } from 'react-icons/md'
import { Link, useLocation } from 'react-router-dom'
import { useUser } from '../../../contexts/UserProvider'
import { useLogout } from '../../../hooks/useLogout'
import { useEffect, useState } from 'react'
import SideBarChallenge from './sidebar-challenge/SideBarChallenge'
import SidebarShopping from './sidebar-shopping/SidebarShopping'
import { ComponentTypes } from '../../../data/challengeData'

interface SideBarUserInfoProps {
    setSelectedComponent: React.Dispatch<React.SetStateAction<ComponentTypes | null >>;
}

const SideBar = ({setSelectedComponent}:SideBarUserInfoProps) => {

    const [activeItem, setActiveItem] = useState<ComponentTypes | null>(null);
    const {user} = useUser();
    const handleLogout = useLogout();
    const location = useLocation();

    useEffect(() => {
        const savedComponent = localStorage.getItem('activeComponent') as ComponentTypes | null;
        if(savedComponent){
            setSelectedComponent(savedComponent);
            setActiveItem(savedComponent);
        }

        return () => {
            localStorage.removeItem('activeComponent');
        };
    }, [setSelectedComponent, location]);
    

    const handleClick = (component:ComponentTypes) => {
        setSelectedComponent(component);
        setActiveItem(component);
        localStorage.setItem('activeComponent', component);
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
                <SideBarChallenge
                    handleClick={handleClick}
                    activeItem={activeItem}
                />
                <SidebarShopping
                    handleClick={handleClick}
                    activeItem={activeItem}
                />
                <ul className={styles.sidebar_myinfo}>
                    <h2 className={styles.sidebar_h2}>마이 정보</h2>
                    <Link to={'/modify'}><li>회원정보 수정</li></Link>
                    <li>회원탈퇴</li>
                </ul>
            </div>
        </div>
    )
}

export default SideBar