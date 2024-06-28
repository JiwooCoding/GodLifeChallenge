import { useEffect, useState } from 'react';
import Attendance from '../../components/Attendance';
import Roulette from '../../components/Roulette';
import { TbCircleNumber1, TbCircleNumber2 } from "react-icons/tb";
import eventData from '../../data/eventData';



const EventPage = () => {
    const [selectedTab, setSelectedTab] = useState(1); // 디폴트로 1번 출석체크를 보여줌
    const [point, setPoint] = useState(0);
    const [totalPoints, setTotalPoints] = useState<number>(0);

    useEffect(() => {
      setTotalPoints(point);
    }, [point]);
    
    
  
    // Roulette에서 포인트를 더하는 함수
    const addRoulettePoints = (points: number) => {
      setTotalPoints(prevPoints => prevPoints + points);
    };
  
    // 출첵 포인트를 더하는 함수
    const addAttendancePoints = (points:number) => {
      setTotalPoints(prevPoints => prevPoints + points);
    }
    const handleTabClick = (tabNumber:number) => {
    setSelectedTab(tabNumber);
    };

    return (
        <>
            {/* <div className='bg-blue-200 text-center pt-16 pb-16'>
                <div className='mb-[25px]'>
                    <h2 className='font-bold text-white text-[50px]'>이벤트 참여하고<br/>
                    포인트 받아가세요!
                    </h2>
                </div>
                <div className="">
                    <div className='flex justify-center'>
                        <TbCircleNumber1
                            className={`text-4xl cursor-pointer m-2 text-white ${selectedTab === 1 ? 'text-white' : 'text-opacity-50'}`}
                            onClick={() => handleTabClick(1)}
                        />
                        <TbCircleNumber2
                            className={`text-4xl cursor-pointer text-white m-2 ${selectedTab === 2 ? 'text-white' : 'text-opacity-50'}`}
                            onClick={() => handleTabClick(2)}
                        />
                    </div>

                    <div className='mt-[25px]'>
                        {selectedTab === 1 && (
                        <Attendance
                        addAttendancePoints={addAttendancePoints}
                        />
                        )}
                        {selectedTab === 2 && <Roulette addRoulettePoints={addRoulettePoints}/>}
                    </div>
                </div>
            </div>  */}

            <div className='inner'>
                <h2 className='font-bold text-[30px] mt-10 border-t border-gray-100 pt-[50px]'>이벤트</h2>
                <ul className='mt-10'>
                    {eventData.map(event => (
                        <li key={event.id} className='flex items-center gap-11 mb-10'>
                            <div>
                                <img src={event.imageUrl} alt='eventImage' style={{width:'250px', height:'auto', borderRadius:'7px', cursor:'pointer'}}/>
                            </div>
                            <div className=''>
                                <div className='mb-5'>
                                    <h2 className='font-bold text-[22px] cursor-pointer'>{event.title}</h2>
                                    <h4 className='text-[15px] cursor-pointer'>{event.description}</h4>
                                </div>
                                <div>
                                    {event.date}
                                </div>    
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default EventPage;
