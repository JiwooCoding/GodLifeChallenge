import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import api from '../../api/api';
import { useUser } from '../../contexts/UserProvider';

export interface UserProfile {
    id: string;
    connected_at: string;
    kakao_account: {
        profile: {
            nickname: string;
            thumbnail_image_url: string;
            profile_image_url: string;
        };
    };
}

export const convertToUser = (userProfile: UserProfile): User => {
    return {
        id: userProfile.id,
        name: userProfile.kakao_account.profile.nickname,
        email: userProfile.id, // 카카오에서는 이메일이 제공되지 않으므로 빈 문자열로 설정
        nickname: userProfile.kakao_account.profile.nickname,
        profileImage: userProfile.kakao_account.profile.profile_image_url || '',
        totalPoint: 0, // 기본값 설정
    };
};

const Redirect = () => {
    const navigate = useNavigate();
    const { setUser } = useUser();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const code = new URL(window.location.href).searchParams.get('code');

                if (!code) {
                    throw new Error('인가 코드가 없습니다.');
                }

                const REST_API_KEY = import.meta.env.VITE_APP_RESTAPI_KAKAO_APP_KEY;
                const redirect_uri = 'http://localhost:5173/kakaoauth';
                const client_secret = import.meta.env.VITE_APP_KAKAO_CLIENT_SECRET;

                const response = await axios.post('https://kauth.kakao.com/oauth/token', new URLSearchParams({
                    grant_type: 'authorization_code',
                    client_id: REST_API_KEY,
                    redirect_uri,
                    code,
                    client_secret
                }), {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                    }
                });

                const { access_token } = response.data;

                const userResponse = await axios.get<UserProfile>('https://kapi.kakao.com/v2/user/me', {
                    headers: {
                        Authorization: `Bearer ${access_token}`
                    }
                });

                const user = convertToUser(userResponse.data);
                setUser(user);
                console.log('kakaoUser',user);

                // 로그 추가
                const response2 = await api.post('/api/login/oauth', user);
                console.log("Token Response: ", response2.data);

                const { accessToken, refreshToken, userId } = response2.data;

                if (!accessToken || !refreshToken) {
                    throw new Error('AccessToken 또는 RefreshToken이 없습니다.');
                }
                localStorage.setItem('accessToken_Kakao', access_token); //카카오 api와 상호작용할 떄 쓰이는 토큰
                localStorage.setItem('accessToken', accessToken); // 서버로부터 받아온 토큰
                localStorage.setItem('refreshToken', refreshToken);
                localStorage.setItem('userId', userId);
                navigate('/');


            } catch (err) {
                console.error(err);
                setError('로그인 과정에서 오류가 발생했습니다.');
            } finally {
                setLoading(false);
            }
        };

        fetchToken();
    }, [navigate, setUser]);

    if (loading) {
        return <div>로그인 중...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return null;
};

export default Redirect;