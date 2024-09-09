import React, { ReactNode } from 'react'
import styles from './Modal.module.scss'

const ModalContent  = ({children}:{children:ReactNode}) => (
    <div className={styles.modal__content}>{children}</div>
);

export default ModalContent 