import React, { ReactNode } from 'react';
import styles from './Modal.module.scss';

const ModalFooter = ({ children }: { children: ReactNode }) => (
  <div className={styles.modal__footer}>{children}</div>
);

export default ModalFooter;
