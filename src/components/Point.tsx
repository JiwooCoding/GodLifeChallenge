
import EventPage from '../page/EventPage/EventPage';
import { useEffect, useState } from 'react';
import WeatherApi from './weather/WeatherApi'
import Modal from './modal/Modal';
import axios from 'axios';


const Point = () => {
    const [totalPoints, setTotalPoints] = useState<number>(0);
    const [modalOpen, setModalOpen]= useState(false);
    const [modalContent, setModalContent] = useState<React.ReactNode>(null);

    useEffect(() => {
        getTotalPoint();
    }, []);

    const getTotalPoint = async() => {
        try {
            const response = await axios.get('http://localhost:3001/api/totalPoint');
            setTotalPoints(response.data.totalPoint); // 포인트 총합
        } catch (error) {
            console.log('totalPoint 못가져옴',error)
        }
    }

    const handleModalOpen = (content:React.ReactNode) => {
        setModalOpen(true);
        setModalContent(content);
    }

    const handleModalClose = () => {
        setModalOpen(false);
        setModalContent(null);
    }

    const handleGiftPoints = (recipientId: string, giftPoints: number) => {
        if(giftPoints > totalPoints){
            alert('포인트가 부족합니다')
            return;
        }
        setTotalPoints((prevPoints) => prevPoints - giftPoints);
        console.log(`${giftPoints}포인트를 ${recipientId}에게 보냈습니다.`)
    }


return (
    <div>
        <div className=''>
            <div>
                <span>이벤트</span>
            </div>
        </div>

        <WeatherApi/>
        <EventPage/>
        <Modal
        isOpen={modalOpen}
        onClose={handleModalClose}
        content={modalContent}
        />
        </div>
    )
}

export default Point