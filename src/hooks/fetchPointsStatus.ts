import api from "../api/api";

export const fetchPointsStatus = async (eventId:string) => {
    try {
        const response = await api.get('/event/checkParticipation', {
            params: {
                eventId: eventId
            }
        });
        console.log(response.data);
        return response.data === true;
    } catch (error) {
        console.log('포인트 부여 받지 못함 에러!!', error);
        return false;
    }
}