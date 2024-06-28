import React from 'react'; 
import { useEffect, useState } from "react"
import Products from "./components/Products"
import './App.css'
import axios from "axios";
import Point from "./components/Point";
import Event from "./components/Event";

function App() {

  const [point, setPoint] = useState(0);
  const [attendance, setAttendance] = useState(0);
  const [lastAttendanceDay, setLastAttendanceDay] = useState<string | null>(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
  const initialPoints = 100;
  const [totalPoints, setTotalPoints] = useState<number>(initialPoints);

  useEffect(() => {
    fetchPointData();
  }, []);

  useEffect(() => {
    setTotalPoints(initialPoints+point);
  }, [point]);
  


  const BtnclickHandler = async() => {
    const today:string = new Date().toISOString().split('T')[0];
    if(today === lastAttendanceDay) {
      alert('이미 출석체크를 하셨습니다.');
      return;
    }


    const newAttendance = attendance + 1;
    setAttendance(newAttendance);
    setLastAttendanceDay(today);

    const earnedPoints = newAttendance % 10 === 0 ? 200 : 100;
    setPoint(point + earnedPoints);

    // if(newAttendance % 10 === 0){
    //   setPoint(point+200);
    // }else{
    //   setPoint(point+100)
    // }


    



    try {
      await axios.post('https://example.com/api/updateAttendance', {
        earnedPoints:earnedPoints,
        attendance: newAttendance,
      });
    } catch (error) {
      console.log(error);
    }
    // 출석체크 후 버튼을 비활성화 상태로 변경
    setIsButtonDisabled(true);
  }


  const fetchPointData = async() => {
    try {
      const url = 'https://서버주소/api/points/check-total-points';
      const response = await axios.get(url);

      setPoint(response.data.point || 0);
      setAttendance(response.data.attendance || 0);
      setLastAttendanceDay(response.data.lastAttendanceDay || null);

      if(response.data.lastAttendanceDay === new Date().toISOString().split('T')[0]){
        setIsButtonDisabled(true);
      }
    } catch (error) {
      console.log(error)
    }
  }
  
  // Roulette에서 포인트를 더하는 함수
  const addRoulettePoints = (points: number) => {
    setTotalPoints(prevPoints => prevPoints + points);
  };



  return (
    <>
      <div className="">
        <Point totalPoints={totalPoints}/>

        <Event 
          BtnclickHandler={BtnclickHandler} 
          isButtonDisabled={isButtonDisabled} 
          attendance={attendance}
          totalPoints={totalPoints}
          addRoulettePoints={addRoulettePoints}
        />
        
        <hr></hr>
        <Products totalPoints={totalPoints}/>
      </div>
    </>
  )
}

export default App
