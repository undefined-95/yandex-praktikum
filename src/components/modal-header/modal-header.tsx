import React, { FC } from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './modal-header.module.css';

const ModalHeader: FC<{
  header: string;
  onClose: (e: React.SyntheticEvent) => void;
}> = ({ header, onClose }) => {
  return (
    <div className={styles.header}>
      <h3 className={`text text_type_main-large ${styles.title}`}>{header}</h3>
      <button onClick={onClose} className={styles.button}>
        <CloseIcon type='primary' />
      </button>
    </div>
  );
};

export default ModalHeader;
