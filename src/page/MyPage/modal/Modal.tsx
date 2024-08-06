import confirm from '../../../image/checked.png'

interface ModalProps {
  completeMessage:string;
  onClose:() => void;
}

const Modal = ({completeMessage, onClose}:ModalProps) => {


  return (
    <div className='modal-overlay'>
        <div className='modal-content'>
            <img src={confirm} alt="update-complete" style={{width:'30px'}}/>
            {completeMessage}
            <button onClick={onClose}>확인</button>
        </div>
    </div>
  )
}

export default Modal