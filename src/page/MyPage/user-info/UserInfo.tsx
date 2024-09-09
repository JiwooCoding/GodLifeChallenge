import { formatNumberWithCommas } from '../../../utils/fomatNumberWithCommas';
import styles from './UserInfo.module.scss'
import { useUser } from '../../../contexts/UserProvider';
import ParticipationChallengePage from '../../ParticipationChallengePage';

interface UserInfoProps {
    selectedComponent:string | null;
}

const UserInfo = ({selectedComponent}:UserInfoProps) => {

    const {user} = useUser();
    
    return (
        <div>
            <h1 className={styles.user_hello}>{user?.name}님, 안녕하세요🖐️</h1>
            <div className={styles.mypage_topbox}>
                <div className={styles.event_container}>
                    <div className={styles.event_box}>
                        <div className={styles.user_point}>
                            <span>보유 포인트</span>
                            <p>{formatNumberWithCommas(user?.totalPoint ?? 0)}P</p>
                        </div>
                        <div className={styles.user_point}>
                            <span>상금</span>
                            <p>4,000P</p>
                        </div>
                    </div>
                </div>
                <div className={styles.event_container}>
                    <h1>챌린지 현황 🏃‍♀️</h1>
                    <div className={styles.event_box}>
                        <div className={styles.user_point}>
                            <span>참가중</span>
                            <p>3</p>
                        </div>
                        <div className={styles.user_point}>
                            <span>완료</span>
                            <p>4</p>
                        </div>
                        <div className={styles.user_point}>
                            <span>개설</span>
                            <p>0</p>
                        </div>
                    </div>
                </div>
                {/* 이 부분에 진행중인 챌린지 내역 들어가야 함 */}
                {/* {selectedComponent === null &&  <ParticipationChallengePage/>} */}
            </div>
        </div>
    );
};

export default UserInfo