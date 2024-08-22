import React from 'react';
import styles from './Modal.module.scss';

interface ModalButtonsProps {
    onClick?: () => void;
    children: React.ReactNode;
    buttonStyle?: string;
}

const ModalButtons = ({ children, onClick, buttonStyle = '' }: ModalButtonsProps) => {
    const buttonClassName = `${styles.modal__button} ${styles[buttonStyle] || ''}`;

    return (
        <button className={buttonClassName} onClick={onClick}>
            {children}
        </button>
    );
};

export default ModalButtons;
