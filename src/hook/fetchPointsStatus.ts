import api from "../api/api";

export const fetchPointsStatus = async (eventId:string) => {
    try {
        const response = await api.get('/api/event/checkParticipation', {
            params: {
                eventId: eventId
            }
        });

        return response.data === true;
    } catch (error) {
        console.log('포인트 부여 받지 못함 에러!!', error);
        return false;
    }
}