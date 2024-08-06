import { useEffect, useState } from 'react';
import { Wheel } from "react-custom-roulette";
import rouletteData from '../../../../data/rouletteData';
import arrow from '../../../../image/event/arrow.png'
import api from '../../../../api/api';
import styles from './RouletteContent.module.scss'
import { useUser } from '../../../../UserProvider';
import { useAppdispatch } from '../../../../hooks/redux';
import { openModal } from '../../../../store/modal/modal.slice';
import NoUserModal from '../../../../components/modal/no-user/NoUserModal';

const RouletteContent = () => {

  const [spin, setSpin] = useState(false); // 룰렛 회전 애니메이션
  const [spinCount, setSpinCount] = useState(3); // 스핀 카운트 초기화
  const [prizeNumber, setPrizeNumber] = useState<number | null>(null); // 당첨 인덱스
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // 룰렛 버튼 활성화/비활성화

  const {user} = useUser();
  const dispatch = useAppdispatch();

  useEffect(() => {
    fetchPointData(); // 초기 로드 시 스핀 카운트 서버에서 받아옴
  }, []);

  const fetchPointData = async () => {
    try {
      // 서버에서 스핀 카운트 가져오기
      const response = await api.get('/api/roulette/spinCount');
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

    if(!user){
      dispatch(openModal(<NoUserModal/>));
      return;
    };
    
    // spin이 false이고 남은 스핀 카운트가 있을 때만 실행
    if (!spin && spinCount > 0) { 
      const pivot = Math.floor((Math.random() * 99) + 1);
      let stack = 0;

      let percentage = rouletteData.map((row) => {
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
      const selectedOption = rouletteData[prizeNumber];

      if (selectedOption.points > 0) {
        alert(`${selectedOption.points}점이 적립되었습니다!`);
      } else {
        alert('꽝입니다.');
      }

      // 서버로 룰렛 데이터 보내기
      try {
        const response = await api.post('/api/roulette/updatePoint', {
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
        await api.post('/api/roulette/updateSpinCount', {
          spinCount: updatedSpinCount
        });
      } catch (error) {
        console.log(error); 
      }
    }
  };

  return (
    <>
      {/* {isModalOpen && (
          <Modal>
              {modalContent}
          </Modal>
        )} */}
    <div className=''>
      <div className={styles.wheel_container}>
        <Wheel
          spinDuration={0.2} // spin 속도
          startingOptionIndex={Math.floor(Math.random() * rouletteData.length)}
          mustStartSpinning={spin}
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
