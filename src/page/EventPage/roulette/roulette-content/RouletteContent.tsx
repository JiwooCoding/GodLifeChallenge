import { useEffect, useState } from 'react';
import { Wheel } from "react-custom-roulette";
import rouletteData from '../../../../data/rouletteData';
import arrow from '../../../../image/event/arrow.png'
import api from '../../../../api/api';
import styles from './RouletteContent.module.scss'
import { useUser } from '../../../../contexts/UserProvider';
import { useAppdispatch } from '../../../../hooks/redux';


const RouletteContent = () => {

  const [spin, setSpin] = useState(false); // 룰렛 회전 애니메이션
  const [spinCount, setSpinCount] = useState(4); // 스핀 카운트 초기화
  const [prizeNumber, setPrizeNumber] = useState<number | null>(null); // 당첨 인덱스
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // 룰렛 버튼 활성화/비활성화

  const {user, setUser} = useUser();
  const dispatch = useAppdispatch();


  const eventId = "f924a3b4-3c1b-4468-b735-5260b858789b";
  useEffect(() => {
    fetchPointData(); // 초기 로드 시 스핀 카운트 서버에서 받아옴
  }, []);

  const fetchPointData = async () => {
    try {
      // 서버에서 스핀 카운트 가져오기
      const response = await api.get(`/api/event/roulette/count/${eventId}`);
      setSpinCount(response.data);
      
      // 스핀 카운트가 0이면 버튼 비활성화
      if (response.data === 0) {
        setIsButtonDisabled(true); 
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSpinClick = () => {
    
    // spinStop false이고 남은 스핀 카운트가 있을 때만 실행
    if (!spin && spinCount > 0) { 
      const pivot = Math.floor((Math.random() * 99) + 1);
      let stack = 0;

      let percentage = rouletteData.map((row) => {
        return row.percentage; 
      });

      let newPrizeNumber: number | null = null;

      percentage.some((row, index) => {
        stack += row;

        if (pivot <= stack) {
          newPrizeNumber = index;
          return true;
        }
        return false;
      });

      if (newPrizeNumber !== null) {
        setPrizeNumber(newPrizeNumber);
        setSpin(true);
      }
    }
  };

  const stopSpinning = async () => {
    setSpin(false);
    if (prizeNumber !== null) {
      const selectedOption = rouletteData[prizeNumber];

      if (selectedOption.points > 0) {
        alert(`${selectedOption.points}점이 적립되었습니다!`);
      } else {
        alert('꽝입니다.');
      }

      // 서버로 룰렛 데이터 보내기
      try {
        await api.post(`/api/event/roulette/updatePoint/${eventId}`, {
          earnedPoints: selectedOption.points
        });

        setUser((prevUser) => {
          if (!prevUser) return prevUser;

          return {
              ...prevUser,
              totalPoint: prevUser.totalPoint + selectedOption.points,
          };
      });
        
        // 스핀 횟수 업데이트
        const updatedSpinCount = spinCount - 1;
        setSpinCount(updatedSpinCount);

        // 스핀 횟수가 0이 되면 비활성화
        if (updatedSpinCount === 0) {
          setIsButtonDisabled(true);
        }
      } catch (error) {
        console.error("Update Points Error:", error); // 에러 로그
      }
    }
  };

  return (
    <>
    <div className=''>
      <div className={styles.wheel_container}>
        <Wheel
          spinDuration={0.2} // spin 속도
          startingOptionIndex={Math.floor(Math.random() * rouletteData.length)}
          mustStartSpinning={spin} //true일 경우 스핀 시작
          prizeNumber={prizeNumber ?? 0}
          data={rouletteData}
          onStopSpinning={stopSpinning}
          backgroundColors={['deeppink', 'hotpink']}
          textColors={['black']}
          outerBorderColor="#fff"
          outerBorderWidth={0}
          innerBorderColor="#fff"
          radiusLineWidth={5}
          innerBorderWidth={3}
          radiusLineColor="#fff" //룰렛 이너 컬러
        />
      </div>
      <img src={arrow} alt='roulette-arrow' className={styles.arrow} style={{width:'150px'}}/>
      <button
        className={`${styles.roulette_button} ${isButtonDisabled ? 'disabled' : ''}`}
        onClick={handleSpinClick}
        disabled={isButtonDisabled}
      >
        START
      </button>
    </div>
    {/* <div>남은 스핀 횟수: {spinCount}</div> */}
    </>
  )
}

export default RouletteContent;
