import GiftModalForm from './giftModalForm/GiftModalForm'

interface GiftModalProps{
  handleGiftPoints:(recipientId: string, giftPoints: number) => void
}

const GiftModal = ({handleGiftPoints}:GiftModalProps) => {

  

  return (
    <div>
      <h1>선물하기</h1>
      <GiftModalForm handleGiftPoints={handleGiftPoints}/>
      <button>선물하기</button>
      <button>닫기</button>
    </div>
  )
}

export default GiftModal