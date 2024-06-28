import { useEffect, useState } from 'react';
import { Wheel } from "react-custom-roulette";
import "../App.css"; 
import axios from "axios";

interface RouletteProps {
  addRoulettePoints: (points: number) => void;
}

const Roulette = ({ addRoulettePoints }: RouletteProps) => {

  const data = [
    { option: '포인트 10000점', percentage: 3, points: 10000 },
    { option: '포인트 1000점', percentage: 7, points: 1000 },
    { option: '꽝', percentage: 30, points: 0 },
    { option: '포인트 100점', percentage: 20, points: 100 },
    { option: '포인트 500점', percentage: 10, points: 500 },
    { option: '포인트 300점', percentage: 10, points: 300 },
  ];

  const [spin, setSpin] = useState(false); // 룰렛 회전 애니메이션
  const [spinCount, setSpinCount] = useState(3); // 스핀 카운트 초기화
  const [prizeNumber, setPrizeNumber] = useState<number | null>(null); // 당첨 인덱스
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // 룰렛 버튼 활성화/비활성화

  useEffect(() => {
    fetchPointData(); // 초기 로드 시 스핀 카운트 서버에서 받아옴
  }, []);

  const fetchPointData = async () => {
    try {
      // 서버에서 스핀 카운트 가져오기
      const response = await axios.get('http://서버주소/api/roulette/spinCount');
      setSpinCount(response.data.spinCount);
      
      // 스핀 카운트가 0이면 버튼 비활성화
      if (response.data.spinCount === 0) {
        setIsButtonDisabled(true); 
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSpinClick = () => {
    // spin이 false이고 남은 스핀 카운트가 있을 때만 실행
    if (!spin && spinCount > 0) { 
      const pivot = Math.floor((Math.random() * 99) + 1);
      let stack = 0;

      let percentage = data.map((row) => {
        return row.percentage; // [10,20,50,15,5]
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
      const selectedOption = data[prizeNumber];

      if (selectedOption.points > 0) {
        alert(`${selectedOption.points}점이 적립되었습니다!`);
        addRoulettePoints(selectedOption.points);
      } else {
        alert('꽝입니다.');
      }

      // 서버로 룰렛 데이터 보내기
      try {
        const response = await axios.post('http://서버주소/api/roulette/updatePoint', {
          earnedPoints: selectedOption.points,
          rewardType: selectedOption.option
        });
        console.log(response.data); 

        // 스핀 횟수 업데이트
        const updatedSpinCount = spinCount - 1;
        setSpinCount(updatedSpinCount);

        // 스핀 횟수가 0이 되면 비활성화
        if (updatedSpinCount === 0) {
          setIsButtonDisabled(true);
        }

        // 업데이트된 스핀 횟수 서버로 보내기
        await axios.post('http://서버주소/api/roulette/updateSpinCount', {
          spinCount: updatedSpinCount
        });
      } catch (error) {
        console.log(error); 
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <Wheel
        spinDuration={0.2} // spin 속도
        startingOptionIndex={Math.floor(Math.random() * data.length)}
        mustStartSpinning={spin}
        prizeNumber={prizeNumber ?? 0}
        data={data}
        onStopSpinning={stopSpinning}
        backgroundColors={['rgb(172 219 247 / 42%)', '#fff']}
        textColors={['black']}
        outerBorderColor="#fff"
        outerBorderWidth={7}
        innerBorderColor="#fff"
        radiusLineColor="transparent"
        radiusLineWidth={1}
      />
      <button
        className={`button ${isButtonDisabled ? 'disabled' : ''}`}
        onClick={handleSpinClick}
        disabled={isButtonDisabled}
      >
        SPIN
      </button>
      <div>남은 스핀 횟수: {spinCount}</div>
    </div>
  )
}

export default Roulette;
