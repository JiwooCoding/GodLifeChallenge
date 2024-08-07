import React, { createContext, ReactNode, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { convertToUser, UserProfile } from './page/KakaoRedirectPage/Redirect';

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

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken');
                if (!accessToken) {
                    throw new Error('access토큰이 없습니다!!');
                }

                const response = await axios.get<UserProfile>('https://kapi.kakao.com/v2/user/me', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });

                const user = convertToUser(response.data);
                setUser(user);

            } catch (error) {
                console.log('유저 데이터 못가져옴', error);
            }
        };

        fetchUser();
    }, []);

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