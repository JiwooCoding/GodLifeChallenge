import React, { ReactNode } from 'react';
import styles from './Modal.module.scss';

const ModalTitle = ({ children }: { children: ReactNode }) => (
    <h2 className={styles.modal__title}>{children}</h2>
);

export default ModalTitle;
