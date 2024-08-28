import React from 'react'
import { useUser } from '../contexts/UserProvider'
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps{
    children: React.ReactNode;
}

const ProtectedRoute = ({children}:ProtectedRouteProps) => {

    const {user} = useUser();

    if(!user){
        return <Navigate to='/login' replace/>
    }
    return (
        <div>{children}</div>
    )
}

export default ProtectedRoute