import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import { useUser } from '../contexts/UserProvider';
import { removeUserId } from '../store/cart/cartSlice';
import { useAppdispatch } from './redux';

export const useLogout = () => {
    const navigate = useNavigate();
    const dispatch = useAppdispatch();
    const { setUser } = useUser();

    const handleLogout = async () => {
        try {
            await api.post('/api/logout'); 
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('userId');
            dispatch(removeUserId());
            setUser(null);
            navigate('/login');
        } catch (error) {
            console.log('로그아웃 에러!!!', error);
        }
    };
    return handleLogout;
};
