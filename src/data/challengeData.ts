import mainImage from '../image/girl1.png'
import mainImage2 from '../image/girl2.png'
import main from '../image/KakaoTalk_20240827_174834837.jpg'

const today = new Date();

export const challenges = [
    {id:'djshkdsj', mainImage:mainImage, title:'8시 기상 미션', startDate:'2024-09-09', endDate:'2024-09-09', uploadStartTime:'18:00', uploadEndTime:'20:30'
        ,progress:70,participationPoints:3000, checkRecords:[
            {
                checkDate:today,
                image:main,
                status:'성공',
                description:'오운완!'
            },
            {
                checkDate:today,
                image:main,
                status:'성공',
                description:'1안녕!'
            },
            {
                checkDate:today,
                image:mainImage,
                status:'성공',
                description:'오운완!'
            },
            {
                checkDate:today,
                image:mainImage2,
                status:'성공',
                description:'오운완!'
            },
            {
                checkDate:today,
                image:mainImage,
                status:'성공',
                description:'오운완!'
            },
            {
                checkDate:today,
                image:mainImage2,
                status:'성공',
                description:'오운완!'
            },
        ]
    },
]

export const authImage = [
    {id:'fdsjjkfjsdjfl', images:mainImage, userName:'지우'},
    {id:'fdsfdsfjsdjfl', images:mainImage, userName:'지우'},
    {id:'fdsjsdfsdfdskfjsdjfl', images:mainImage, userName:'지우'},
    {id:'fdsjjkfdfsfdsjsdjfl', images:mainImage, userName:'지우'},
    {id:'fdsjjkfjdsffsfsdjfl', images:mainImage, userName:'지우'},
    {id:'fdsjjdsdkfjsdjfl', images:mainImage, userName:'지우'},
    {id:'fdsjjkfjsfdsfdsdsssdjfl', images:mainImage, userName:'지우'},
    {id:'fdsjjkfjsdjssadsasdfl', images:mainImage, userName:'지우'},
    {id:'fdsjjkfjssssdjfl', images:mainImage, userName:'지우'},
    {id:'fdsjjkfjsdjfl', images:mainImage, userName:'지우'},
    {id:'fdasdasdsjjkffjsdjfl', images:mainImage, userName:'지우'},
    {id:'fdsjjkfjsdfsxc3242sdjfl', images:mainImage, userName:'지우'},
    {id:'fdsjjkf32423424jsdjfl', images:mainImage, userName:'지우'},
    {id:'fdsjjkfjsdjewr78654fl', images:mainImage, userName:'지우'},
    {id:'fdsjjkfj2345eytergsfdsbsdjfl', images:mainImage, userName:'지우'}
]

export const participate = [
    {id:'123', name:'지우', profile:mainImage},
    {id:'1234', name:'지우', profile:mainImage},
    {id:'12341', name:'지우', profile:mainImage},
    {id:'123123', name:'지우', profile:mainImage},
    {id:'123123123', name:'지우', profile:mainImage},
]

export const ComponentTypes = {
    PRODUCT:'Product',
    DONATION:'donation',
    GIFT:'gift',
    EVENT:'event',
    PARTICIPATE: 'participate',
    REGISTER: 'register',
    HISTORY:'history'
} as const;

export type ComponentTypes = typeof ComponentTypes[keyof typeof ComponentTypes];

