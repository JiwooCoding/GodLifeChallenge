import { useEffect, useState } from 'react';
import styles from './GetPoint.module.scss'
import api from '../../../api/api';
import { fetchPointsStatus } from '../../../hooks/fetchPointsStatus';

const GetPoint = () => {
  const [isMouseMoved, setIsMouseMoved] = useState(false); //마우스 움직임
  const [timeSpent, setTimeSpent] = useState(10); //카운팅 시간 설정
  const [pointsGranted, setPointsGranted] = useState(false); //참여여부(포인트 적립여부)
  const [isPageVisible, setIsPageVisible] = useState(true); //페이지 가시성
  const eventId = '2d89d5c3-0328-46d0-83f9-7af1f8fbc0be';

  // 참여 여부 확인
  useEffect(() => {
    const checkPointStatus = async () => {
      const status = await fetchPointsStatus(eventId);
      setPointsGranted(status);
      setIsPageVisible(!status);
    };
    checkPointStatus();
  }, []); 

  

  useEffect(() => {
    const handleMouseMove = () => {
      if (!isMouseMoved) {
        setIsMouseMoved(true);
      }
    };

    if (isPageVisible && !pointsGranted) {
      document.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isMouseMoved, isPageVisible, pointsGranted]);


  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isMouseMoved && !pointsGranted && isPageVisible) {
      // 역으로 카운트하기 위한 setInterval
      timer = setInterval(() => {
        setTimeSpent(prevTime => {
          if (prevTime <= 0) {
            clearInterval(timer);
            grantPoints();
            return prevTime;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [isMouseMoved, pointsGranted, isPageVisible]);


  const grantPoints = async () => {
    if (!pointsGranted) {
      setPointsGranted(true);
      alert('포인트가 적립되었습니다!');

      // 서버에 포인트 부여 상태를 업데이트하는 요청
      try {
        await api.post(`/api/event/view-point/${eventId}`, {         
          earnedPoints: 200 
        },);
      } catch (error) {
        console.error('기부 페이지 포인트 이벤트 오류', error);
      }
    }
  };

  if (!isPageVisible) {
    return null;
  }

  return (
    <div className={styles.timer}>
      <p>⏰ 포인트 적립까지 <b>{timeSpent}</b>초가 남았습니다!</p>
    </div>
  );
};

export default GetPoint;