import React from 'react'

const SocialKakao = () => {

    const REST_API_KEY = import.meta.env.VITE_APP_RESTAPI_KAKAO_APP_KEY;
    const redirect_uri = 'http://localhost:5173/kakaoauth';
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${redirect_uri}&response_type=code`;

    const handleLogin = () => {
        window.location.href = kakaoURL;
    }


    return (
        <div>
            <button onClick={handleLogin}>
                카카오 로그인
            </button>
        </div>
    )
}

export default SocialKakao