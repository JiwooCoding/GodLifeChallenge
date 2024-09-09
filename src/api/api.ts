import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:8081',
    withCredentials: true, // 쿠키 포함 요청
});

const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.href = '/login';
};

export const postRefreshToken = async () => {
    try {
        const response = await axios.post('http://localhost:8081/api/refreshToken', {
            refreshToken: localStorage.getItem('refreshToken'),
        });
        const accessToken = response.data.accessToken;
        localStorage.setItem('accessToken', accessToken); // 갱신된 accessToken 저장
        return accessToken; // 갱신된 accessToken 반환
    } catch (error) {
        logout(); // 토큰 갱신 실패 시 로그아웃 처리
    }
};

// 요청이 서버로 전송되기 전에 실행됨
api.interceptors.request.use(
    async (config) => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            // 헤더에 담아 보내면 서버에서 요청을 인증할 수 있게 됨
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 응답이 클라이언트에 도달하기 전에 실행됨
api.interceptors.response.use(
    // 응답이 정상적으로 처리된 경우 (200번대 응답)
    (response) => {
        return response; 
    },

    // 200번대 응답 아닐 경우 (특히 401 Unauthorized)
    async (error) => {
        const originalRequest = error.config;

        // accessToken 만료 시 처리
        if (error.response.status === 401 && !originalRequest.sent) {
            originalRequest.sent = true; // 요청이 재시도되지 않았음을 표시

            try {
                const newAccessToken = await postRefreshToken(); // 갱신된 accessToken
                localStorage.setItem('accessToken', newAccessToken);

                // 원래 요청의 'Authorization' 헤더에 새로운 accessToken으로 업데이트
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return api(originalRequest); // 원래 요청을 재시도
            } catch (refreshError) {
                // 401 에러 발생 시 경고 메시지 출력 후 로그아웃
                alert("세션이 만료되었습니다. 다시 로그인해주세요.");
                logout();
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;
