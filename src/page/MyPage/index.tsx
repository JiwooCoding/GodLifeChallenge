import EarnPoints from './point/EarnPoints';
import { Link } from 'react-router-dom';
import './Mypage.scss'
import event from '../../image/mypage/event.png'
import money from '../../image/mypage/6.png'
import service from '../../image/mypage/service.png'
import setting from '../../image/mypage/8.png'
import { useUser } from '../../UserProvider';

const MyPage = () => {

    const user = useUser();

    return (
        <div className='page'>
            <div className='mypage'>
                <h1>마이페이지</h1>
                {/* 기본정보 */}
                <div className='myInfo'> 
                    <img src={user?.user?.profileImage} alt='profile-image' style={{width:'160px', borderRadius:'40%', marginTop:'20px'}}/>
                    {/* <img src={noImage} alt='profile-image' style={{width:'160px', borderRadius:'40%'}}/> */}
                    <Link to={'/modify'}><img src={setting} alt='setting-myinfo' className='setting-info'/></Link>
                    <p className='username'> {user?.user?.nickname}</p>
                </div>

                {/* 인포 박스 */}
                <div className='info-box'>
                    <Link to={'/event'}>
                        <div className='info-box__content'>
                            <img src={event} alt='event-icon' style={{width:'50px'}}/>
                            <p>이벤트</p>
                        </div>
                    </Link>
                    <div className="jb-division-line"></div>
                    <div className='info-box__content'>
                    <img src={money} alt='event-icon' style={{width:'45px'}}/>
                        <p>{user?.user?.totalPoint === 0 ? '0' : user?.user?.totalPoint} P</p>
                    </div>
                    <div className="jb-division-line"></div>
                    <div className='info-box__content'>
                        <img src={service} alt='event-icon' style={{width:'45px'}}/>
                        <p>고객센터</p>
                    </div>
                </div>

                {/* 포인트 사용 내역 */}
                <div className='info-point'>
                    <h2>포인트</h2>
                    <div className='point-history'>
                        <p>적립 · 사용 내역</p>
                        <EarnPoints/>
                    </div>
                </div>
            </div>
        </div>
        );
    };

export default MyPage;