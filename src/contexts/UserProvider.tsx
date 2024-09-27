import React, { createContext, ReactNode, useContext, useState, useEffect } from 'react';
import api from '../api/api';
import { useLocation } from 'react-router-dom';


interface UserContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
    children: ReactNode;
}

const UserProvider = ({ children }: UserProviderProps) => {
    const [user, setUser] = useState<User | null>(null);

    const location = useLocation();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken');
                if (!accessToken) {
                    throw new Error('access토큰이 없습니다!!');
                }

                const response = await api.get<User>('/api/user');
                setUser(response.data);
                console.log('유저정보', response.data)
                localStorage.setItem('user', JSON.stringify(response.data));

            } catch (error) {
                console.log('유저 데이터 못가져옴', error);
            }
        };

        fetchUser();

    }, [location.pathname]);


    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser 에러!!!');
    }
    return context;
};

export default UserProvider;
