import styles from './SideBarChallenge.module.scss'

interface SideBarChallengeProps {
    handleClick: (component: 'participate' | 'register') => void;
    activeItem:string | null;
}

const SideBarChallenge = ({handleClick, activeItem}:SideBarChallengeProps) => {

    return (

        <ul className={styles.sidebar_challenge}>
            <h2>챌린지 내역</h2>
            <li
                className={activeItem === 'participate' ? styles.active : ''}
                onClick={() => handleClick('participate')}
            >
                참여 챌린지
            </li>
            <li
                className={activeItem === 'register' ? styles.active : ''}
                onClick={() => handleClick('register')}
            >
                등록 챌린지
            </li>
        </ul>

    )
}

export default SideBarChallenge