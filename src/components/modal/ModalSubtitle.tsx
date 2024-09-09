import React, { ReactNode } from 'react';
import styles from './Modal.module.scss';

const ModalSubtitle = ({ children }: { children: ReactNode }) => (
  <h3 className={styles.modal__subtitle}>{children}</h3>
);

export default ModalSubtitle;
