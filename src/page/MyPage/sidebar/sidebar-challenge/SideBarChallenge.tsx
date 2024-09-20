import { ComponentTypes } from '../../../../data/challengeData';
import styles from './SideBarChallenge.module.scss'

interface SideBarChallengeProps {
    handleClick: (component: ComponentTypes) => void;
    activeItem:string | null;
}


const SideBarChallenge = ({handleClick, activeItem}:SideBarChallengeProps) => {


    return (

        <ul className={styles.sidebar_challenge}>
            <h2>챌린지</h2>
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
                개설 챌린지
            </li>
            <li
                className={activeItem === 'history' ? styles.active : ''}
                onClick={() => handleClick('history')}
            >
                챌린지 내역 조회
            </li>
        </ul>

    )
}

export default SideBarChallenge