import React from 'react'

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    content: React.ReactNode;
}

const Modal = ({isOpen, onClose, content}:ModalProps) => {

    if(!isOpen) return null;

    return (
    <div className='modal-overlay' onClick={onClose}>
        <div className='modal-content'>
            {content}
        </div>
    </div>
)
}

export default Modal