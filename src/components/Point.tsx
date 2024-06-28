import pointImage from '../image/img-mypoint.png'
import { SlArrowRight } from "react-icons/sl";
import EventPage from '../page/EventPage/EventPage';

interface PointProps {
    totalPoints: number;
}

const Point = ({totalPoints}:PointProps) => {

  return (
    <>
    <div className='inner'>
        <div className="font-bold mb-44">
            <div className="text-center">
                <p className="text-[35px] mb-4">MY 포인트</p>
                <div className="text-[15px] text-gray-500 font-light">
                    <p>고객님의 소중한 포인트, 꼼꼼하게 관리하세요!</p>
                </div>
                </div>
                <div className="mt-20 text-[25px] font-light flex justify-between items-center">
                <div>
                    <p>회원님의 사용가능 포인트입니다.</p>  
                    <div className="flex items-center gap-5 relative mb-4">
                    <p className="text-[35px]"><b className="font-bold text-blue-600">{totalPoints}</b> Point</p>
                    <SlArrowRight style={{ width: '10px'}}/>
                    </div>
                    <div className="flex text-[15px] font-light gap-4 cursor-pointer">
                    <a>선물하기</a>
                    <a>적립하기</a>
                    <a>전환하기</a>
                    <a>충전하기</a>
                </div>
                </div>
                    <div>
                        <img src={pointImage} alt="pointImage"/>
                    </div>
                </div>
            </div>
        </div>

        <EventPage/>
        </>
    )
}

export default Point