import api from "../api/api";

export const fetchPointsStatus = async (eventId: string) => {
    try {
        const response = await api.get('/api/event/checkParticipation',{
            params:{
                eventId
            }
        });
        if(response.data === true){
            return true;
        }else{
            return false;
        }
    } catch (error) {
        console.log('기부페이지 포인트 이벤트 에러', error);
        return false;
    }
}
