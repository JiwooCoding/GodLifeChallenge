import api from "../api/api";

export const fetchPointsStatus = async (eventId: string) => {
    try {
        const response = await api.get('/api/event/checkParticipation',{
            params:{
                eventId
            }
        });
        console.log('Response:', response);
        return response.data; //서버에서 boolean 값을 직접 반환해줌
    } catch (error) {
        console.log('기부페이지 포인트 이벤트 에러', error);
        return false;
    }
}
