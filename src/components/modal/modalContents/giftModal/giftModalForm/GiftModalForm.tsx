import { useState } from "react";

interface GiftModalFormProps{
  handleGiftPoints:(recipientId: string, giftPoints: number) => void;
}

const GiftModalForm = ({handleGiftPoints}:GiftModalFormProps) => {

  const [recipientId, setRecipientId] = useState<string>('');
  const [selectedPoints, setSelectedPoints] = useState(0);
  const [error, setError] = useState('');

  const points = [500, 1000, 3000];

  const handleSendGift = () => {
    if(recipientId && selectedPoints !== null){
      handleGiftPoints(recipientId, selectedPoints);
    }else{
      setError('아이디와 포인트를 선택해주세요')
    }
  }

  return (
    <div>
      <p>선물 받으실 분의 아이디를 입력해주세요</p>
      <input type='text' placeholder='아이디 입력'/>
      <div>
        {points.map(point => (
          <button>{point}</button>
        ))}
      </div>

      <button onClick={handleSendGift}>선물하기</button>
    </div>
  )
}

export default GiftModalForm