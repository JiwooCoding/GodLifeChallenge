import { ReactNode } from 'react';
import styles from './Modal.module.scss';
import { IoCloseOutline } from "react-icons/io5";
import { useModal } from '../../contexts/ModalProvider';

const ModalHeader = ({children}:{children:ReactNode}) => {
    const { closeModal } = useModal();

    return (
        <div className={styles.modal__header}>
            <h2>{children}</h2>
            <IoCloseOutline onClick={closeModal} size={30} style={{cursor: 'pointer'}}/>
        </div>
    );
};

export default ModalHeader;
