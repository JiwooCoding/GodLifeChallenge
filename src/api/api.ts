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
    const refreshToken = localStorage.getItem('refreshToken');
    const accessToken = localStorage.getItem('accessToken');

    try {
        const response = await axios.post('http://localhost:8081/api/refreshToken', {
            refreshToken,
            accessToken
        });

        if(response.status === 200){
            //토큰이 성공적으로 발급된 경우
            localStorage.setItem("accessToken",response.data.accessToken);
            return response.data.accessToken;
        } else if(response.status === 401){
            handleTokenExpiration();
        }
    } catch (error) {
        handleTokenExpiration();
    }
    return null;
};

const handleTokenExpiration = () => {
    localStorage.clear();
    window.alert('세션이 만료되었습니다. 다시 로그인해 주세요.');
    logout();
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
    (response) => {
        return response; 
    }, //정상응답

    //401응답에 대한 처리
    async (error) => {
        const originalRequest = error.config;

        // accessToken 만료 시 처리
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // 요청이 재시도되지 않았음을 표시

            const newAccessToken = await postRefreshToken();
            if(newAccessToken){
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return api(originalRequest); //요청 재시도
            }
        }
        //401이외의 에러
        window.alert('예기치 않은 오류가 발생했습니다. 다시 시도해 주세요.');
        return Promise.reject(error);
    }
);

export default api;
