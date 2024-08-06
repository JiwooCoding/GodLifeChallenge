import { useState } from "react";
import api from "../../../../api/api";
import Modal from "../../../../components/modal/GlobalModal";
import { useAppSelector } from "../../../../hooks/redux";


const AttendanceContent = () => {
  const [attendance, setAttendance] = useState(0); // 출석 횟수
  const [hasAttendance, setHasAttendance] = useState(false); // 출석 여부
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // 버튼 disabled
  const [point, setPoint] = useState<number>(0); // 누적 포인트(출석) 

  const isModalOpen = useAppSelector((state) => state.modalSlice.isOpen);
  const modalContent = useAppSelector((state) => state.modalSlice.content);


  // 서버에서 데이터 가져오기
  const fetchPointData = async () => {
    try {
      const response = await api.get('/api/points/attendancePoints');

      setPoint(response.data.point || 0); // 서버에서 가져온 출석 누적 포인트
      setAttendance(response.data.attendance || 0); // 서버에서 가져온 출석 횟수
      setHasAttendance(response.data.hasattendance); // 서버에서 가져온 출첵 여부

      if (response.data.hasattendance === true) {
        setIsButtonDisabled(true);
      }

    } catch (error) {
      console.log(error);
    }
  };

  const BtnclickHandler = async () => {
    
    if (hasAttendance === true) {
      alert('이미 출석체크를 하셨습니다.');
      setIsButtonDisabled(true);
      return;
    }

    const newAttendance = attendance + 1;
    setAttendance(newAttendance);
    setHasAttendance(true);

    const earnedPoints = newAttendance % 10 === 0 ? 200 : 100;
    const updatePoints = point + earnedPoints;
    setPoint(updatePoints); // 포인트 업데이트
    // eventPoints(earnedPoints); // earnedPoints를 전달

    // 서버에 데이터 보내기
    try {
      await api.post('/api/updateAttendance', {
        earnedPoints: earnedPoints, // 출첵으로 얻은 포인트
        attendance: newAttendance, // 출첵 횟수
        hasattendance: hasAttendance, // 출첵 여부
      });

      await fetchPointData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {/* {isModalOpen && (
        <Modal>
            {modalContent}
        </Modal>
      )} */}
      <div className="mb-6 flex flex-col items-center">
        <h1 className="text-[33px]">7월 출석체크</h1>
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
};

export default AttendanceContent;
