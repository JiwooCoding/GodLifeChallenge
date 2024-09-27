import { useEffect, useState } from 'react';
import { Wheel } from "react-custom-roulette";
import rouletteData from '../../../../data/rouletteData';
import arrow from '../../../../image/event/arrow.png'
import api from '../../../../api/api';
import styles from './RouletteContent.module.scss'
import RouletteButton from './roulette-button/RouletteButton';

const RouletteContent = () => {

  const [spin, setSpin] = useState(false); // 룰렛 회전 애니메이션
  const [spinCount, setSpinCount] = useState(3); // 스핀 카운트 초기화
  const [prizeNumber, setPrizeNumber] = useState<number | null>(null); // 당첨 인덱스
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // 룰렛 버튼 활성화/비활성화

  const eventId = "f924a3b4-3c1b-4468-b735-5260b858789b";
  
  useEffect(() => {
    const fetchPointData = async () => {
      try {
        const response = await api.get(`/api/event/roulette/count/${eventId}`);
        setSpinCount(response.data);
        
        if (spinCount === 0) {
          setIsButtonDisabled(true); 
        }
      } catch (error) {
        console.log('룰렛 돌리기 에러!',error);
      }
    };
    
    fetchPointData(); 
  }, []);


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

        // 스핀 횟수가 0이 되면 비활성화
        if (spinCount === 0) {
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
      <RouletteButton
        disabled={isButtonDisabled}
        spin={spin}
        setSpin={setSpin}
        setPrizeNumber={setPrizeNumber}
        spinCount={spinCount}
        
      />
    </div>
    {/* <div>남은 스핀 횟수: {spinCount}</div> */}
    </>
  )
}

export default RouletteContent;
