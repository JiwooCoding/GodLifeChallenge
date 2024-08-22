import axios from "axios";

const api = axios.create({
    //프록시 하면서 baseURL없이 전달합니다. (/api/*로 시작하게 설정해야해요)
    baseURL:'http://localhost:8081',
    withCredentials:true, //쿠키 포함 요청
});


//요청
//요청이 서버로 전송되기 전에 실행됨
api.interceptors.request.use(
    async (config) => {
        const accessToken = localStorage.getItem('accessToken');
        if(accessToken){
            //헤더에 담아 보내면 서버에서 요청을 인증할 수 있게 됨
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

//응답
//응답이 클라이언트에 도달하기 전에 실행됨
api.interceptors.response.use(
    //응답이 정상적으로 처리된 경우
    (response) => {
        return response; //응답 데이터 반환
    },
    //응답 처리 중 에러 발생한 경우
    async (error) => {
        const originalRequest  = error.config;

        //accessToken만료시 처리
        if(error.response.status === 401 && !originalRequest._retry){
            // _retry : 객체의 임시 속성 (요청이 재시도 되었는지 여부 추적)
            originalRequest._retry = true; //요청이 재시도 되지 않았다 
            //새로운 토큰 발급 중 
            try {
                const response = await axios.post('/api/refresh-token', {}, { withCredentials: true });
                const newAccessToken = response.data.accessToken;
                localStorage.setItem('accessToken', newAccessToken);

                //원래 요청의 'Authorization' 헤더에 새로운 accessToken으로 업데이트
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return api(originalRequest);

            } catch (refreshError) {
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
)

export default api;
