import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {

    const isLoggedIn = localStorage.getItem('accessToken') !== null;

    return isLoggedIn ? <Outlet/> : <Navigate to="/login" replace/>
}

export default ProtectedRoute