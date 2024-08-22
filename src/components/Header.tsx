import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserProvider';
import api from '../api/api';
import pointSmile from '../image/pointsmile.png';
import { useAppdispatch, useAppSelector } from '../hooks/redux';
import { removeUserId } from '../store/cart/cartSlice';

const Header = () => {
    const isLoggedIn = localStorage.getItem('accessToken') !== null;
    const navigate = useNavigate();
    const dispatch  = useAppdispatch();
    const { user, setUser } = useUser();
    const { products } = useAppSelector((state) => state.cartSlice);
    const admin = 'admin@gmail.com'

    const handleLogout = async () => {
        try {
            await api.post('/api/logout');
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('userId');
            dispatch(removeUserId());
            setUser(null);
            navigate('/');
        } catch (error) {
            console.log('로그아웃 에러!!!', error);
        }
    };

    return (
        <header className='navbar'>
            <div className='nav_inner'>
                <div className='flex justify-between items-end'>
                    <div>
                        <Link to={'/'}>
                            <img src={pointSmile} alt='mainLogo' style={{ width: '200px' }} />
                        </Link>
                    </div>
                    <div className='flex flex-col items-end gap-5'>
                        <div className='flex gap-5'>
                            {isLoggedIn ? (
                                <>
                                    <Link to={'/mypage'}>
                                        <h3 className='navbar_right'>마이페이지</h3>
                                    </Link>
                                    <h3 className='navbar_right' onClick={handleLogout}>로그아웃</h3>
                                    <Link to={'/cart'}>
                                        <h3 className='navbar_right'>
                                            장바구니 (<span className='font-bold text-red-500'>{products.length}</span>)
                                        </h3>
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link to={'/login'}>
                                        <h3 className='navbar_right'>로그인</h3>
                                    </Link>
                                    <Link to={'/register'}>
                                        <h3 className='navbar_right'>회원가입</h3>
                                    </Link>
                                    <Link to={'/cart'}>
                                        <h3 className='navbar_right'>
                                            장바구니 (<span className='font-bold text-red-500'>{products.length}</span>)
                                        </h3>
                                    </Link>
                                </>
                            )}
                        </div>
                        <div className='flex gap-[100px]'>
                            <Link to={'/product'} className='navbar_left'>포인트 쇼핑</Link>
                            <Link to={'/donation'}><h2 className='navbar_left'>후원과 참여</h2></Link>
                            <Link to={'/event'} className='navbar_left'>이벤트</Link>
                            {user?.email === admin &&  <Link to={'/productupload'}><h2 className='navbar_left'>업로드</h2></Link>}
                            
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
