import axios from "axios";
import {  useEffect, useState } from "react";

interface AttendanceProps {
  addAttendancePoints: (points:number) => void;
}

const Attendance = ({addAttendancePoints}:AttendanceProps) => {

  const [attendance, setAttendance] = useState<number>(0); // 출석 횟수
  const [lastAttendanceDay, setLastAttendanceDay] = useState<string | null>(null); // 마지막 출석체크 날짜
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false); // 버튼 disabled
  const [point, setPoint] = useState<number>(0); //누적 포인트(출석) 


  useEffect(() => {
    fetchPointData();
  }, []);


  //서버에서 데이터 가져오기
  const fetchPointData = async() => {
    try {
      const response = await axios.get('https://서버주소/api/points/attendancePoints');

      setPoint(response.data.point || 0); //서버에서 가져온 출석 누적 포인트
      setAttendance(response.data.attendance || 0); // 서버에서 가져온 출석 횟수
      setLastAttendanceDay(response.data.lastAttendanceDay || null); //서버에서 가져온 마지막 출석 날짜

      if(response.data.lastAttendanceDay === new Date().toISOString().split('T')[0]){
        setIsButtonDisabled(true);
      }
    } catch (error) {
      console.log(error)
    }
  }
  

  const BtnclickHandler = async() => {
    const today:string = new Date().toISOString().split('T')[0];
    if(today === lastAttendanceDay) {
      alert('이미 출석체크를 하셨습니다.');
      setIsButtonDisabled(true)
      return;
    }

    const newAttendance = attendance + 1;
    setAttendance(newAttendance);
    setLastAttendanceDay(today);

    const earnedPoints = newAttendance % 10 === 0 ? 200 : 100;
    const updatePoints = point + earnedPoints;
    setPoint(updatePoints); //포인트 업데이트
    addAttendancePoints(updatePoints);

  //서버에 데이터 보내주기
  try {
    await axios.post('https://example.com/api/updateAttendance', {
      earnedPoints:earnedPoints, //출첵으로 얻은 포인트
      attendance: newAttendance, //출첵 횟수
      lastAttendanceDay: today, //마지막 출첵 날짜
    });

    await axios.post('https://서버주소//api/updatePoints',{
      totalPoints: updatePoints, // 누적 출첵 포인트
    });
  } catch (error) {
    console.log(error);
  }
}

  return (
    <div className="">
      <div className="mb-6 flex flex-col items-center">
        {/* <img src={attendanceImg} alt='attendanceImage' style={{width:'150px', height:'auto'}}/>  */}
        <p className="text-[33px]">6월 출석체크</p>
        <p className="text-[13px] text-gray-400 font-light">출석체크는 하루에 한번만 가능해요</p>
        <p className="text-[13px] text-gray-400 font-light">출석일수 10일 단위로 포인트 100점 추가 적립됩니다!</p>
      </div>

      <div className="flex justify-center text-center">
        <div className="bg-white rounded-md max-w-[23rem] w-full p-7 shadow-xl flex justify-around">
          <div>
            <p>이번달 출석 횟수</p>
            <div className="flex justify-center items-center gap-2">
              <p className="text-[25px] font-bold text-blue-700">{attendance}</p>
              <p className="text-[14px]">회</p>
            </div>
          </div>
          <div>
            <p>누적 포인트</p>
            <div className="flex justify-center items-center gap-2">
              <p className="text-[25px] font-bold text-blue-700">{point}</p>
              <p className="text-[14px]">P</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center mt-4 w-full">
        <button 
          onClick={BtnclickHandler} 
          disabled={isButtonDisabled} 
          className={`button ${isButtonDisabled ? 'disabled' : ''}`}>
          {isButtonDisabled ? '내일 또 만나요' : '출석체크 하기'}
        </button>
      </div>
    </div>
  );
}

export default Attendance;
