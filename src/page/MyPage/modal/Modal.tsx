import confirm from '../../../image/checked.png'
import styles from './Modal.module.scss'

interface ModalProps {
  completeMessage:string;
  onClose:() => void;
}

const Modal = ({completeMessage, onClose}:ModalProps) => {


  return (
    <div className={styles.modal_overlay}>
        <div className={styles.modal_content}>
            <img src={confirm} alt="update-complete" style={{width:'30px'}}/>
            {completeMessage}
            <button type='button' onClick={onClose}>확인</button>
        </div>
    </div>
  )
}

export default Modal