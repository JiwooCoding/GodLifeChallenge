import React, { ReactNode } from 'react';
import ModalHeader from './ModalHeader';
import ModalContent from './ModalContent';
import ModalFooter from './ModalFooter';
import ReactDOM from 'react-dom';
import styles from './Modal.module.scss';
import ModalDimmed from './ModalDimmed';
import ModalTitle from './ModalTitle';
import ModalSubtitle from './ModalSubtitle';
import ModalButtons from './ModalButtons';

interface ModalProps {
    isOpen: boolean;
    children: ReactNode;
    onClose: () => void;
    onClick?: () => void;
}

const Modal = ({children, isOpen}:ModalProps) => {

    if(!isOpen) return null;

    return ReactDOM.createPortal(
    <div className={styles.modal}>
        {children}
    </div>,
    document.body   
    )   
}

Modal.Dimmed = ModalDimmed;
Modal.Header = ModalHeader;
Modal.Content = ModalContent;
Modal.Footer = ModalFooter;

Modal.Title = ModalTitle;
Modal.Subtitle = ModalSubtitle;
Modal.Button = ModalButtons;

export default Modal;
