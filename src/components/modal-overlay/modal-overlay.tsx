import React, { FC } from 'react';
import styles from './modal-overlay.module.css';

const ModalOverlay: FC<{ onClose: (e: React.SyntheticEvent) => void }> = ({
  onClose, children
}) => {
  return <div className={styles.backdrop} onClick={onClose}>{children}</div>;
};

export default ModalOverlay;
