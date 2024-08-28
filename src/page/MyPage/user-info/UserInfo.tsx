import { formatNumberWithCommas } from '../../../utils/fomatNumberWithCommas';
import styles from './UserInfo.module.scss'
import calendar from '../../../image/mypage/12.png'
import roulette from '../../../image/mypage/11.png'
import { Link } from 'react-router-dom';
import { SlArrowRight } from "react-icons/sl";
import { useUser } from '../../../contexts/UserProvider';

const UserInfo = () => {

    const {user} = useUser();
    
    return (
        <div>
            <h1 className={styles.user_hello}>{user?.name}님, 안녕하세요🖐️</h1>
            <div className={styles.mypage_topbox}>
                <div className={styles.event_container}>
                    <div className={styles.event_text}>
                        <h3>놓칠 수 없는 <b>오늘의 혜택</b></h3>
                        <Link to={'/event'}>
                            <div className={styles.goto_eventPage}>
                                <p>더보기</p>
                                <SlArrowRight size={8}/>
                            </div>
                        </Link>
                    </div>
                    <div className={styles.event_box}>
                        <div className={styles.user_point}>
                            <span>보유 포인트</span>
                            <p>{formatNumberWithCommas(user?.totalPoint ?? 0)}P</p>
                        </div>
                        <Link to={'/attendance'}>
                            <div className={styles.attendance_box}>
                                <img src={calendar} style={{ width: '30px' }} />
                                <div className={styles.event_innerbox}>
                                    <span>출석체크 하고</span>
                                    <p>매일 100포인트 받기</p>
                                </div>
                            </div>
                        </Link>
                        <Link to={'/roulette'}>
                            <div className={styles.roulette_box}>
                                <img src={roulette} style={{ width: '30px' }} />
                                <div className={styles.event_innerbox}>
                                    <span>룰렛 돌리고</span>
                                    <p>최대 15,000포인트 받기</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserInfo