import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'
import { useUser } from '../UserProvider';

const NavBar = () => {

    //로그인 상태 확인
    const isLoggedIn = localStorage.getItem('accessToken') !== null;

    const navigate = useNavigate();
    const {user} = useUser();

    const handlerLogout = async() => {
        try {
            await axios.post('http://localhost:3001/api/logout');
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            navigate('/');
        } catch (error) {
            console.log('로그아웃 에러!!!',error);
        }
    }

    return (
    <div className='navbar'>
        <div className='nav_inner'>
        <div className='flex justify-between'>
            <div className='flex'>
                <Link to={'/product'} className='navbar_left'>쇼핑</Link>
                <Link to={'/event'} className='navbar_left'>이벤트</Link>
                {user?.email === 'asdf'&& (<Link to={'/productupload'}><h2 className='navbar_left'>업로드</h2></Link>)}
                <Link to={'/donation'}><h2 className='navbar_left'>기부</h2></Link> 
                {/* 업로드는 기업 회원한테만 보이도록 설정해야 함 */}
            </div>
            <div className='flex'>
                {isLoggedIn ? (
                    <>
                        <Link to={'/mypage'}><h3 className='navbar_righr'>마이페이지</h3></Link>
                        <h3 className='navbar_right' onClick={handlerLogout}>로그아웃</h3>
                    </>
                ): (
                    <>
                        <Link to={'/login'}><h3 className='navbar_right'>로그인</h3></Link>
                        <Link to={'/register'}><h3 className='navbar_right'>회원가입</h3></Link>
                    </>
                )}
                
            </div>
        </div>
        </div>
    </div>
    )
}

export default NavBar