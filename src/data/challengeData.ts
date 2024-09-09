import mainImage from '../image/girl1.png'

export const challenges = [
    {id:'djshkdsj', mainImage:mainImage, title:'8시 기상 미션', startDate:'2024-09-09', endDate:'2024-09-10', uploadStartTime:'18:00', uploadEndTime:'20:30'},
    {id:'dss', mainImage:mainImage, title:'8시 기상 미션', startDate:'2024-09-10', endDate:'2024-09-11', uploadStartTime:'08:00', uploadEndTime:'10:30'},
    {id:'djssddsfashkdsj', mainImage:mainImage, title:'8시 기상 미션', startDate:'2024-09-01', endDate:'2024-09-09', uploadStartTime:'08:00', uploadEndTime:'21:30'}
]

export type IChallengeHistory = {
    id:string;
    mainImage:string;
    title:string;
    startDate:string;
    endDate:string;
    uploadStartTime:string;
    uploadEndTime:string;
}