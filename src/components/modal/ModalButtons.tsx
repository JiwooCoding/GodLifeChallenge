import React from 'react';
import styles from './Modal.module.scss';

interface ModalButtonsProps {
    onClick?: () => void;
    children: React.ReactNode;
    buttonStyle?: string;
    type?: 'button' | 'submit' | 'reset';
}

const ModalButtons = ({ children, onClick, buttonStyle = '', type }: ModalButtonsProps) => {
    const buttonClassName = `${styles.modal__button} ${styles[buttonStyle] || ''}`;

    return (
        <button className={buttonClassName} onClick={onClick} type={type}>
            {children}
        </button>
    );
};

export default ModalButtons;
