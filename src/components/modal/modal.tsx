//Можно лучше: Импорты должны быть упорядочены.
import React, { useEffect, FC } from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";
import ModalHeader from "../modal-header/modal-header";
import ModalOverlay from "../modal-overlay/modal-overlay";
const modalRoot = document.getElementById("react-modals")!;

//Необхимо исправить: Нужно задать конкретную тепизацию.
const Modal: FC<{
  onClose: (e: any) => void;
  header: string;
  children: React.ReactNode;
}> = ({ onClose, header, children }) => {
  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose(e);
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [onClose, children]);

  return ReactDOM.createPortal(
    <>
      <ModalOverlay onClose={onClose}>
        <div className={`p-5 ${styles.modal}`} data-cy="modal">
          <ModalHeader header={header} onClose={onClose} />
          {children}
        </div>
      </ModalOverlay>
    </>,
    modalRoot
  );
};

export default Modal;
