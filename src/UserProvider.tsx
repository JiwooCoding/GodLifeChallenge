import React, { createContext, ReactNode, useContext, useState, useEffect } from 'react';
import api from './api/api';
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

                const kakaoApiUrl = 'https://kapi.kakao.com/v2/user/me';
                const headers = {
                    Authorization: `Bearer ${accessToken}`
                };

                try {
                    const response = await axios.get<UserProfile>(kakaoApiUrl, { headers });
                    const user = convertToUser(response.data);
                    setUser(user);
                } catch (kakaoError) {
                    // 카카오 API가 실패하면 이메일 토큰으로 간주하고 서버에서 사용자 정보를 가져옴
                    try {
                        const response = await api.get<User>('/user', { headers });
                        setUser(response.data);
                    } catch (emailError) {
                        console.log('유저 데이터 못가져옴', emailError);
                    }
                }
            } catch (error) {
                console.log('유저 데이터 못가져옴', error);
            }
        };

        const handleBeforeUnload = () => {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        fetchUser();

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
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
