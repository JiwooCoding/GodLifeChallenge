// GlobalModal.tsx
import styles from './Modal.module.scss';
import { useAppdispatch, useAppSelector } from '../../hooks/redux';


const GlobalModal = () => {
    const {isOpen, content} = useAppSelector((state) => state.modalSlice);

    if (!isOpen) return null;


    return (
        <div className={styles.modal_overlay}>
            <div className={styles.modal_content}>
                {content}
            </div>
        </div>
    );
};

export default GlobalModal;
