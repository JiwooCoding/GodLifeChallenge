import './Modal.scss'
import clap from '../../../image/clap.png'
import { useNavigate } from 'react-router-dom';

interface ModalProps {
    isOpen:boolean;
    onClose:() => void;
}


const Modal = ({isOpen, onClose}:ModalProps) => {

    const navigate = useNavigate();

    const handleGotoHomepage = () => {
        navigate('/login');
    }

    if (!isOpen) return null;

    return (
    <div className='modal-overlay'>
        <div className='modal-content'>
            <div className='modal-register-content'>
                <img src={clap} alt='register-complete'/>
                <h2>회원가입을 축하합니다!</h2>
                <p>지금 바로 다양한 콘텐츠를 즐겨보세요.</p>
            </div>
            <button className='modal-button confirm' onClick={handleGotoHomepage}>확인</button>
        </div>
    </div>
    )
}

export default Modal